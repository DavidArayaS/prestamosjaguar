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
3. Configura los datos SMTP en `.env`.

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

## Proton Mail
Ejemplo recomendado en `.env`:
- `SMTP_HOST=smtp.protonmail.ch`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=tu-cuenta@proton.me`
- `SMTP_PASS=tu-clave-smtp-o-app-password`
- `NOTIFY_TO=tu-cuenta@proton.me`
- `FROM_EMAIL=tu-cuenta@proton.me`

## Notas
- Si faltan variables SMTP, el formulario mostrara error del servidor.
- Puedes personalizar textos y estilo en `public/app.js` y `public/styles.css`.
