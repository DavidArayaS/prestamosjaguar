require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

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

app.post('/api/solicitud', async (req, res) => {
  const data = req.body || {};
  const required = [
    'nombreCompleto',
    'cedula',
    'telefonoPrincipal',
    'correo',
    'montoPrestamo',
    'tipoPropiedad',
    'tamanoPropiedad',
    'valorFiscal'
  ];

  const missing = required.filter((field) => !data[field]);
  if (missing.length > 0) {
    return res.status(400).json({
      ok: false,
      message: `Campos faltantes: ${missing.join(', ')}`
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
    `Monto solicitado: ${data.montoPrestamo}`,
    `Tipo de propiedad: ${data.tipoPropiedad}`,
    `Tamano de propiedad: ${data.tamanoPropiedad}`,
    `Valor fiscal: ${data.valorFiscal}`,
    `Ubicacion: ${data.ubicacion || 'No indicada'}`,
    `Ingreso mensual: ${data.ingresoMensual || 'No indicado'}`,
    `Deudas actuales: ${data.deudasActuales || 'No indicado'}`,
    `Comentarios: ${data.comentarios || 'Sin comentarios'}`,
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
    <p><strong>Monto solicitado:</strong> ${data.montoPrestamo}</p>
    <p><strong>Tipo de propiedad:</strong> ${data.tipoPropiedad}</p>
    <p><strong>Tamano de propiedad:</strong> ${data.tamanoPropiedad}</p>
    <p><strong>Valor fiscal:</strong> ${data.valorFiscal}</p>
    <p><strong>Ubicacion:</strong> ${data.ubicacion || 'No indicada'}</p>
    <p><strong>Ingreso mensual:</strong> ${data.ingresoMensual || 'No indicado'}</p>
    <p><strong>Deudas actuales:</strong> ${data.deudasActuales || 'No indicado'}</p>
    <p><strong>Comentarios:</strong> ${data.comentarios || 'Sin comentarios'}</p>
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
