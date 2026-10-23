# Cognito: web y Android
Referencia de clase: [Integración Cognito con Web App y Mobile, 16-10-2026](https://www.youtube.com/watch?v=_E0L5mn-sTM).

- Un user pool compartido para los usuarios.
- Dos clientes públicos sin secreto: SPA para React y móvil para Android.
- Grupos en minúsculas: admin, coordinador, monitor y participante. Admiten varias membresías.
- En web: oidc-client-ts y react-oidc-context, AuthProvider, authorization code y PKCE.
- Callback web: http://localhost:3000/auth/callback y https://TU-PROYECTO.vercel.app/auth/callback.
- Salida web: http://localhost:3000/ y https://TU-PROYECTO.vercel.app/.
- En Android: callback cl.duoc.syncpass://cognito/callback; registrar también la URL de cierre de sesión correspondiente.
- Solicitar openid y email. No guardar un secreto de cliente en Vite ni en Android.
- VITE_COGNITO_ISSUER contiene el issuer del pool; VITE_COGNITO_CLIENT_ID identifica exclusivamente el cliente web.
- La API valida firma, issuer, vencimiento, token_use=access y client_id. Los roles se obtienen de cognito:groups.
- Los usuarios sin grupo pueden iniciar sesión pero no modificar datos. La asignación de grupos se realiza en la consola Cognito.

El pool existente observado en la consola es us-east-1_2C9bbmKGd. Su cliente 6166ssk62lsbrqv7i98tk08htc fue creado como móvil; la web debe tener un cliente separado.

## Correspondencia con el video
00:51–05:30: pool y clientes; 05:40–08:16: usuarios y grupos; 08:21–11:29: callbacks web y móvil; 11:38–12:55: configuración Android; 13:10–16:08: AuthProvider en React.

La creación manual de usuarios, el cambio de contraseña y las invitaciones se completan en Cognito. Usar cuentas de prueba autorizadas. Los cambios locales no crean ni asignan automáticamente usuarios en AWS.
