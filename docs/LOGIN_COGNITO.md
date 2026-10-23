# Demostración del inicio de sesión con Cognito

El login web de SyncPass utiliza el grupo de usuarios `us-east-1_2C9bbmKGd` de Amazon Cognito y el cliente SPA público `SyncPass Web Local` (`677bhbj1qg892bmlk2pr1h6had`). La aplicación usa Authorization Code con PKCE mediante `react-oidc-context` y `oidc-client-ts`, siguiendo la integración mostrada en [Integración Cognito con Web App y Mobile](https://www.youtube.com/watch?v=_E0L5mn-sTM).

Para demostrarlo:

1. Iniciar la web con `npm run dev` dentro de `web-react` y abrir `http://localhost:3000/login`.
2. Pulsar **Continuar con Cognito**. Debe abrirse la página administrada de Cognito. La URL contiene el ID del cliente, `response_type=code`, `code_challenge_method=S256` y el retorno `http://localhost:3000/auth/callback`.
3. Como el grupo de usuarios aún no tiene cuentas, crear una desde **Create an account**, verificar el correo y completar el inicio de sesión. Las credenciales se ingresan únicamente en Cognito, no en SyncPass.
4. Cognito devuelve un código de autorización a `/auth/callback`; la biblioteca lo intercambia por tokens. SyncPass vuelve a `/login` y muestra **Sesión iniciada correctamente con Amazon Cognito** y el correo del usuario, sin imprimir tokens.
5. Pulsar **Cerrar sesión**. La web elimina la sesión local y redirige al cierre de sesión de Cognito, que retorna a la página inicial.

La configuración local está en `web-react/.env.local`, ignorada por Git. Para una demostración en otra computadora, levantar Vite en esa computadora con la misma URL `localhost:3000`; para una URL pública habría que agregar su HTTPS a los retornos permitidos del cliente Cognito.
