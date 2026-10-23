# Demostración SyncPass: JAR en EC2 y Postman

La arquitectura de la entrega es: React en Vercel → API Gateway → JAR Spring Boot en EC2 → PostgreSQL de Supabase. Cognito registra/inicia sesión y entrega el token de acceso; la API valida ese token. Vercel no ejecuta el JAR.

## Preparación una sola vez

1. Crear el proyecto gratuito en Supabase y copiar **Connect → Session pooler**. Usar el host, puerto, usuario y contraseña indicados por ese panel. Crear el esquema `syncpass` una vez. La URL Java debe ser `jdbc:postgresql://HOST:PUERTO/postgres?sslmode=require&currentSchema=syncpass`. No copiar la contraseña al repositorio.
2. En Cognito, agregar `https://oauth.pstmn.io/v1/callback` entre los callback URLs del cliente SPA público existente. Mantener habilitado Authorization code grant con PKCE. El registro se prueba con los requests 00A y 00B de Postman usando un usuario de prueba nuevo y su código de correo; el inicio de sesión se prueba con OAuth 2.0/PKCE desde la autorización de la colección.
3. Volver a iniciar el laboratorio AWS Academy. Comprobar el estado de EC2 `i-01d851d6163897cb1` en `us-east-1` y arrancarla si está detenida. Anotar la **IPv4 pública actual**: puede cambiar después de un stop/start.
4. Si cambió la IP, actualizar la integración de API Gateway para que apunte al nuevo origen EC2 y actualizar `API_DOMAIN=api.IP-CON-GUIONES.nip.io`. Comprobar que el grupo de seguridad permita HTTP 80 y HTTPS 443. La instancia usa HTTPS en Caddy; no exponer el puerto 8080 directamente.

## Ejecutar el JAR en EC2

Copiar el proyecto a `/opt/syncpass` en EC2. En ese servidor, copiar `deploy/ec2-supabase.env.example` a `/opt/syncpass/.env` y reemplazar los marcadores con los valores del proyecto Supabase y la URL real de Vercel. Mantener el archivo privado: `chmod 600 /opt/syncpass/.env`.

Desde `/opt/syncpass` ejecutar:

```bash
docker compose --env-file .env -f deploy/compose.ec2.supabase.yaml up -d --build
docker compose --env-file .env -f deploy/compose.ec2.supabase.yaml ps
docker compose --env-file .env -f deploy/compose.ec2.supabase.yaml logs --tail=100 api
curl -fsS https://API.DOMINIO/actuator/health
```

El `Dockerfile` compila `backend/target/syncpass-api-1.0.0.jar` dentro de la imagen y lo ejecuta con `java -jar app.jar`. Flyway crea `talleres` y `registros` en el esquema `syncpass` de Supabase al primer arranque. El contenedor API debe aparecer **healthy** y el endpoint debe devolver `{"status":"UP"}`. Si el profesor pide el archivo JAR, se puede extraer de la imagen compilada; el requisito de ejecución queda demostrado por los logs y la respuesta de salud.

## Demostración en Postman

Importar [SyncPass-EC2.postman_collection.json](postman/SyncPass-EC2.postman_collection.json). Ajustar `base_url` si cambió la URL pública de API Gateway. Para registrar una cuenta de prueba, definir `nuevo_usuario`, `nuevo_correo`, `nuevo_apodo`, `nueva_clave` y `codigo_verificacion` como variables locales de Postman; ejecutar 00A, copiar el código recibido por correo y ejecutar 00B. En Authorization de la colección, usar **Get New Access Token** y **Use Token**. Debe abrirse el login de Cognito con PKCE. No guardar contraseñas, códigos ni tokens en el repositorio.

Ejecutar los requests 01–06 en orden: salud del JAR, lectura pública de talleres desde Supabase, rechazo 401 sin token, perfil/roles autenticados, creación de taller como administrador y lectura del taller persistido. La creación requiere el usuario del grupo `admin` o `coordinador`. Un usuario recién registrado sin grupo puede iniciar sesión, pero no crear talleres hasta que se le asigne un rol.

La colección demuestra registro mediante la API de Cognito, login con Cognito y uso del token contra la API Java. `/api` no implementa un endpoint propio de registro. Para ahorrar el crédito del laboratorio, detener EC2 al acabar la demostración; mientras esté detenida, API Gateway devolverá error y la parte dinámica de Vercel no responderá.
