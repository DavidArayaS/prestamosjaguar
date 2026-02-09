require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': ["'self'", "'unsafe-inline'", 'https://challenges.cloudflare.com'],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
        'img-src': ["'self'", 'data:'],
        'connect-src': ["'self'", 'https://challenges.cloudflare.com'],
        'frame-src': ["'self'", 'https://challenges.cloudflare.com']
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

const solicitudLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 40 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.'
  }
});

app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: false, limit: '64kb' }));
app.use(
  express.static('public', {
    etag: isProduction,
    lastModified: isProduction,
    maxAge: isProduction ? '1h' : 0,
    setHeaders(res, filePath) {
      if (/\.html$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        return;
      }

      if (isProduction && /\.(js|css|svg|png|jpg|jpeg|webp|ico)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    }
  })
);

const moneyRanges = {
  CRC: { min: 10000000, max: 100000000 },
  USD: { min: 20000, max: 200000 }
};
const allowedEmailDomains = new Set([
  'gmail.com',
  'googlemail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'proton.me',
  'protonmail.com',
  'icloud.com',
  'me.com',
  'mac.com'
]);

function buildTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE).toLowerCase() === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

function validateMoney(value, currency) {
  const amount = Number(value);
  const range = moneyRanges[currency];
  if (!Number.isFinite(amount) || amount < 0 || !range) return false;
  return amount >= range.min && amount <= range.max;
}

function validatePositiveMoney(value, currency) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 && Boolean(moneyRanges[currency]);
}

function toCrc(amount, currency) {
  return currency === 'USD' ? amount * 525 : amount;
}

function isDigits(value, maxLen) {
  return new RegExp(`^[0-9]{1,${maxLen}}$`).test(String(value || ''));
}

function inLength(value, maxLen) {
  return typeof value === 'string' && value.length > 0 && value.length <= maxLen;
}

function validLandRecord(value) {
  if (typeof value === 'undefined' || value === null) return false;
  const cleaned = String(value).trim();
  if (cleaned.length === 0) return false;
  if (cleaned.length > 20) return false;
  return /^[A-Za-z0-9-]+$/.test(cleaned);
}

function validPropertySize(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 && n <= 50000;
}

function validAllowedEmail(email) {
  const value = String(email || '').trim().toLowerCase();
  const at = value.lastIndexOf('@');
  if (at <= 0 || at === value.length - 1) return false;
  const domain = value.slice(at + 1);
  return allowedEmailDomains.has(domain);
}

function isCaptchaEnabled() {
  return Boolean(process.env.TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);
}

async function verifyTurnstileToken(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const params = new URLSearchParams();
  params.set('secret', secret);
  params.set('response', token);
  if (remoteIp) params.set('remoteip', remoteIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!response.ok) return false;
  const data = await response.json();
  return Boolean(data.success);
}

app.get('/api/public-config', (_req, res) => {
  return res.json({
    captchaEnabled: isCaptchaEnabled(),
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || ''
  });
});

app.use('/api/solicitud', solicitudLimiter);

app.post('/api/solicitud', async (req, res) => {
  const data = req.body || {};
  const required = [
    'nombreCompleto',
    'cedula',
    'telefonoPrincipal',
    'correo',
    'montoPrestamo',
    'monedaMontoPrestamo',
    'tipoPropiedad',
    'numeroFincaPlano',
    'tamanoPropiedad',
    'valorFiscal',
    'monedaValorFiscal',
    'provincia',
    'canton'
  ];

  const missing = required.filter((field) => !data[field]);
  if (missing.length > 0) {
    return res.status(400).json({
      ok: false,
      message: `Campos faltantes: ${missing.join(', ')}`
    });
  }

  if (isCaptchaEnabled()) {
    const token = String(data.captchaToken || '').trim();
    if (!token) {
      return res.status(400).json({ ok: false, message: 'Captcha requerido para enviar la solicitud.' });
    }
    const captchaOk = await verifyTurnstileToken(token, req.ip);
    if (!captchaOk) {
      return res.status(400).json({ ok: false, message: 'Captcha invalido o vencido. Intenta de nuevo.' });
    }
  }

  if (!inLength(data.nombreCompleto, 40)) {
    return res.status(400).json({ ok: false, message: 'Nombre completo invalido (maximo 40 caracteres).' });
  }
  if (!isDigits(data.cedula, 11)) {
    return res.status(400).json({ ok: false, message: 'Cedula invalida (solo numeros, maximo 11).' });
  }
  if (!isDigits(data.telefonoPrincipal, 8)) {
    return res.status(400).json({ ok: false, message: 'Telefono principal invalido (8 digitos).' });
  }
  if (data.telefonoSecundario && !/^[0-9]{1,8}$/.test(String(data.telefonoSecundario))) {
    return res.status(400).json({ ok: false, message: 'Telefono secundario invalido (maximo 8 digitos).' });
  }
  if (!inLength(data.correo, 50)) {
    return res.status(400).json({ ok: false, message: 'Correo invalido (maximo 50 caracteres).' });
  }
  if (!validAllowedEmail(data.correo)) {
    return res.status(400).json({ ok: false, message: 'Correo no permitido. Usa Gmail, Hotmail, Live, Outlook, Proton o Apple.' });
  }
  if (!validPropertySize(data.tamanoPropiedad)) {
    return res.status(400).json({ ok: false, message: 'Tamaño de propiedad invalido (maximo 50000 m2).' });
  }
  if (!validLandRecord(data.numeroFincaPlano)) {
    return res
      .status(400)
      .json({ ok: false, message: 'Número de finca/plano invalido (1 a 20 caracteres: letras, numeros y guiones).' });
  }

  if (
    !validateMoney(data.montoPrestamo, data.monedaMontoPrestamo) ||
    !validatePositiveMoney(data.valorFiscal, data.monedaValorFiscal)
  ) {
    return res.status(400).json({
      ok: false,
      message: 'Montos invalidos. Revisa moneda, minimo y maximo permitidos.'
    });
  }

  const montoCrc = toCrc(Number(data.montoPrestamo), data.monedaMontoPrestamo);
  const fiscalCrc = toCrc(Number(data.valorFiscal), data.monedaValorFiscal);
  if (fiscalCrc < montoCrc * 1.5) {
    return res.status(400).json({
      ok: false,
      message: 'El valor fiscal debe ser al menos 50% mayor al monto solicitado.'
    });
  }

  const transporter = buildTransporter();
  if (!transporter) {
    return res.status(500).json({
      ok: false,
      message:
        'Configuracion de correo incompleta en el servidor. Completa las variables SMTP del archivo .env.'
    });
  }

  const to = process.env.NOTIFY_TO;
  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;

  if (!to || !from) {
    return res.status(500).json({
      ok: false,
      message: 'Falta configurar NOTIFY_TO o FROM_EMAIL en .env.'
    });
  }

  const subject = `Nueva solicitud de prestamo - ${data.nombreCompleto}`;

  const text = [
    'Nueva solicitud recibida desde la web',
    '',
    `Nombre completo: ${data.nombreCompleto}`,
    `Cedula: ${data.cedula}`,
    `Telefono principal: ${data.telefonoPrincipal}`,
    `Telefono secundario: ${data.telefonoSecundario || 'No indicado'}`,
    `Correo: ${data.correo}`,
    `Monto solicitado: ${data.montoPrestamo} ${data.monedaMontoPrestamo}`,
    `Tipo de propiedad: ${data.tipoPropiedad}`,
    `Numero de finca/plano catastro: ${data.numeroFincaPlano || 'No indicado'}`,
    `Tamano de propiedad (m2): ${data.tamanoPropiedad}`,
    `Valor fiscal: ${data.valorFiscal} ${data.monedaValorFiscal}`,
    `Ubicacion: ${data.provincia}, ${data.canton}`,
    '',
    `Fecha: ${new Date().toISOString()}`
  ].join('\n');

  const html = `
    <h2>Nueva solicitud de prestamo</h2>
    <p><strong>Nombre completo:</strong> ${data.nombreCompleto}</p>
    <p><strong>Cedula:</strong> ${data.cedula}</p>
    <p><strong>Telefono principal:</strong> ${data.telefonoPrincipal}</p>
    <p><strong>Telefono secundario:</strong> ${data.telefonoSecundario || 'No indicado'}</p>
    <p><strong>Correo:</strong> ${data.correo}</p>
    <p><strong>Monto solicitado:</strong> ${data.montoPrestamo} ${data.monedaMontoPrestamo}</p>
    <p><strong>Tipo de propiedad:</strong> ${data.tipoPropiedad}</p>
    <p><strong>Numero de finca/plano catastro:</strong> ${data.numeroFincaPlano || 'No indicado'}</p>
    <p><strong>Tamano de propiedad (m2):</strong> ${data.tamanoPropiedad}</p>
    <p><strong>Valor fiscal:</strong> ${data.valorFiscal} ${data.monedaValorFiscal}</p>
    <p><strong>Ubicacion:</strong> ${data.provincia}, ${data.canton}</p>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html
    });

    return res.json({ ok: true, message: 'Solicitud enviada correctamente.' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return res.status(500).json({
      ok: false,
      message: 'No se pudo enviar el correo. Revisa la configuracion SMTP.'
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
