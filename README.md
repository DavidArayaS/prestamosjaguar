# Prestamos Jaguar

Sitio web informativo de prestamos hipotecarios con:
- landing principal profesional (estilo financiero con transparencias)
- seccion de experiencia y propuesta de valor
- calculadora de credito
- formulario de solicitud (envio por correo)
- testimonios
- idioma espanol por defecto con cambio a ingles

## Requisitos
- Node.js 18+

## Instalacion
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea tu archivo de entorno desde el ejemplo:
   ```bash
   cp .env.example .env
   ```
3. Configura los datos SMTP (Brevo) y Cloudflare Turnstile en `.env`.

## Ejecutar
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000)

## Variables de entorno
- `PORT`: puerto del servidor
- `SMTP_HOST`: host SMTP
- `SMTP_PORT`: puerto SMTP (`587` o `465`)
- `SMTP_SECURE`: `true` para SSL directo (`465`), `false` para STARTTLS (`587`)
- `SMTP_USER`: usuario SMTP
- `SMTP_PASS`: password SMTP / app password
- `NOTIFY_TO`: correo que recibira las solicitudes
- `FROM_EMAIL`: correo remitente
- `TURNSTILE_SITE_KEY`: site key de Cloudflare Turnstile
- `TURNSTILE_SECRET_KEY`: secret key de Cloudflare Turnstile

## Brevo (SMTP)
Ejemplo recomendado en `.env`:
- `SMTP_HOST=smtp-relay.brevo.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=tu-smtp-login`
- `SMTP_PASS=tu-smtp-key`
- `FROM_EMAIL=tu-remitente-verificado@tudominio.com`
- `NOTIFY_TO=tu-correo@tudominio.com`

## Cloudflare Turnstile
- `TURNSTILE_SITE_KEY=tu-turnstile-site-key`
- `TURNSTILE_SECRET_KEY=tu-turnstile-secret-key`

## Notas
- Si faltan variables SMTP, el formulario mostrara error del servidor.
- Si faltan variables de Turnstile, el captcha se desactiva automaticamente.
- Puedes personalizar textos y estilo en `public/app.js` y `public/styles.css`.
