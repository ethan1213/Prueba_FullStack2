# Guía Auth0 — Autenticación y roles de SyncPass

Guía paso a paso para autenticar la aplicación web de SyncPass con **Auth0**, incluyendo
roles (RBAC) y consumo de una API protegida.

**Referencia oficial del docente:** <https://github.com/docentedev/citt-sync-pass-front>
(ese repo es la bitácora verificada del flujo completo: Auth0 + BFF Spring Boot).
Esta guía es la adaptación de esos pasos a **nuestro** repo (`web-react/`).

> Restricción del caso (§5.1): no se usan credenciales productivas ni datos reales.
> Los usuarios de prueba en Auth0 deben ser **100% ficticios**.

---

## 0. Qué resuelve Auth0 en este caso

El caso exige (§3.4) *"autenticación de usuarios por roles"* contra una API REST
institucional. Auth0 nos entrega eso sin escribir backend de identidad:

| Perfil del caso (§3.1)           | Rol Auth0 (slug) | Qué puede hacer en SyncPass                       |
| -------------------------------- | ---------------- | ------------------------------------------------- |
| —  (administrador de plataforma) | `admin`          | Todo: auditoría, respaldos, gestión de usuarios   |
| Docente / Coordinador(a)         | `coordinator`    | CRUD de proyectos y eventos + panel de quórum     |
| Estudiante Voluntario / Monitor  | `volunteer`      | Escaneo QR y registro de asistencia en terreno    |
| Beneficiario Comunitario         | `attendee`       | Ver actividades y responder encuestas             |

Los slugs son **idénticos** a los del repo del docente, para que un mismo tenant de
Auth0 sirva a los dos proyectos.

---

## 1. Instalar el SDK

```bash
cd web-react
npm install @auth0/auth0-react
```

Queda `@auth0/auth0-react` ^2.28.2 (misma mayor que la referencia).

---

## 2. Crear la aplicación en el Dashboard de Auth0

1. <https://manage.auth0.com> → **Applications → Create Application**.
2. Nombre: `SyncPass Web`. Tipo: **Single Page Application**.
3. En **Settings**, registrar las URLs (Auth0 compara el string **exacto**, por eso se
   registran con y sin `/` final):

   | Campo                       | Valores                                                                  |
   | --------------------------- | ------------------------------------------------------------------------ |
   | Allowed Callback URLs       | `http://localhost:3000`, `http://localhost:3000/`, `https://<tu-app>.vercel.app`, `https://<tu-app>.vercel.app/` |
   | Allowed Logout URLs         | las mismas                                                               |
   | Allowed Web Origins         | las mismas                                                               |

   > Nuestro Vite corre en **3000** (ver `web-react/vite.config.js`), no en 5173.

4. **Connections**: dejar sólo *Username-Password-Authentication* (email + password).
   Desactivar las conexiones sociales mientras usen las *Dev Keys* de Auth0, o el login
   mostrará el aviso `Dev Keys`.

Anotar de **Settings**: `Domain` y `Client ID`. Ambos son **públicos** (viajan en el JS
del navegador). **Nunca** poner el `Client Secret` en el frontend.

---

## 3. Centralizar la configuración

Todo vive en un único archivo: `web-react/src/config/auth.js`. Cada valor sale de una
variable `VITE_*` con un default en duro, porque el plan gratuito de Vercel no permite
setear variables de entorno en producción.

```js
const env = import.meta.env

export const AUTH0_DOMAIN    = env.VITE_AUTH0_DOMAIN    ?? 'dev-xxxxxxxx.us.auth0.com'
export const AUTH0_CLIENT_ID = env.VITE_AUTH0_CLIENT_ID ?? 'xxxxxxxxxxxxxxxx'
export const AUTH0_AUDIENCE  = env.VITE_AUTH0_AUDIENCE  ?? 'https://sync-pass-api'
export const ROLES_CLAIM     = env.VITE_AUTH0_ROLES_CLAIM ?? 'https://sync-pass/roles'
export const API_URL         = env.VITE_API_URL ?? 'http://localhost:8080'
```

**Regla de orden:** nada de credenciales ni URLs hardcodeadas fuera de ese archivo
(ni en páginas, ni en componentes).

En local, para apuntar a otro tenant o a otra API, se crea `web-react/.env.local`
(está en `.gitignore`):

```
VITE_AUTH0_DOMAIN=dev-xxxxxxxx.us.auth0.com
VITE_AUTH0_CLIENT_ID=xxxxxxxxxxxxxxxx
VITE_API_URL=http://localhost:8080
```

Precedencia de Vite en dev: `.env.development.local` > `.env.development` > `.env.local` > `.env`.
**Hay que reiniciar `npm run dev`** después de cambiar cualquier `.env`.

---

## 4. Envolver la app en el `Auth0Provider`

`web-react/src/main.jsx`:

```jsx
import { Auth0Provider } from '@auth0/auth0-react'
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_AUDIENCE } from './config/auth.js'

<Auth0Provider
  domain={AUTH0_DOMAIN}
  clientId={AUTH0_CLIENT_ID}
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: AUTH0_AUDIENCE,
  }}
  cacheLocation="localstorage"
  useRefreshTokens
>
  <App />
</Auth0Provider>
```

`cacheLocation="localstorage"` + `useRefreshTokens` mantienen la sesión al recargar y
al volver desde el escáner QR en terreno (en móvil el navegador descarta la memoria con
facilidad).

---

## 5. Roles: Post-Login Action

Auth0 **no** envía los roles en el token por defecto. Hay que inyectarlos con una Action.

1. **User Management → Roles**: crear `admin`, `coordinator`, `volunteer`, `attendee`.
2. Asignarlos a los usuarios de prueba (ficticios).
3. **Actions → Library → Build Custom**, nombre `add-roles-claim`, trigger *Login / Post Login*:

```js
exports.onExecutePostLogin = async (event, api) => {
  const claim = 'https://sync-pass/roles';
  const roles = event.authorization?.roles ?? [];
  api.idToken.setCustomClaim(claim, roles);
  api.accessToken.setCustomClaim(claim, roles);
};
```

4. **Deploy** y arrastrar la Action al flujo **Login**.

> El claim debe quedar **idéntico** a `ROLES_CLAIM` en `src/config/auth.js` y al que
> valide la API. Debe inyectarse en el **ID token y en el access token**: el front lee el
> ID token, la API valida el access token.

---

## 6. Leer los roles en React

`web-react/src/hooks/useRoles.js` expone `useUserRoles()` y `useHasRole(...slugs)`.

```jsx
const esCoordinador = useHasRole('coordinator', 'admin')
```

---

## 7. Proteger rutas

`web-react/src/components/RequireAuth.jsx` envuelve la ruta y, opcionalmente, exige roles:

```jsx
<Route path="/panel">
  <RequireAuth roles={[ROLES.coordinator, ROLES.admin]}>
    <PanelQuorumPage />
  </RequireAuth>
</Route>
```

> ⚠️ El frontend **sólo oculta UI**. La autorización real la valida la API con el token.
> Nunca confiar en el rol del navegador para decidir qué datos entregar.

---

## 8. Registrar la API y consumirla con token

1. **Applications → APIs → Create API**: nombre `Sync Pass API`,
   Identifier `https://sync-pass-api`, algoritmo **RS256**.
2. En la API → **Machine to Machine Applications**: autorizar `SyncPass Web`.
3. En la API → **Settings**: activar **Allow Skipping User Consent**.
4. En el front, pedir el token con el `audience` y llamar:

```jsx
const { getAccessTokenSilently } = useAuth0()
const token = await getAccessTokenSilently({
  authorizationParams: { audience: AUTH0_AUDIENCE },
})
const eventos = await apiGet('/api/eventos', token)
```

`web-react/src/clients/api.js` ya encapsula esto (`apiGet` / `apiPost` / `apiSyncBatch`).

`apiSyncBatch` es el endpoint que el caso §3.4 pide para el **batch sync** de las
marcaciones y encuestas acumuladas offline.

---

## 9. Deploy en Vercel

1. Importar el repo en Vercel, **Root Directory: `web-react`**.
2. Preset **Vite** (Build `npm run build`, Output `dist`, Install `npm install`).
3. `web-react/vercel.json` ya trae el rewrite SPA; sin él, recargar `/panel` da 404:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

4. Volver a Auth0 y agregar la URL de producción a Callback / Logout / Web Origins.

---

## 10. Errores típicos y su causa

| Error                                                      | Causa y solución                                                                                     |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Callback URL mismatch`                                    | Falta la URL exacta en *Allowed Callback URLs*. Registrarla con y sin `/`, en local **y** en prod.    |
| Aviso `Dev Keys`                                           | La conexión social usa credenciales de prueba de Auth0. Desactivarla en *Applications → Connections*. |
| `Consent required`                                         | Activar *Allow Skipping User Consent* en la API y dejar el fallback a `loginWithRedirect`.            |
| `Client ... is not authorized to access resource server`   | Autorizar la SPA en la API (*Machine to Machine Applications*).                                       |
| Los roles llegan vacíos                                    | La Action no está desplegada o no está en el flujo *Login*; o el claim no coincide con `ROLES_CLAIM`. |
| 404 al recargar una ruta en Vercel                         | Falta el rewrite SPA en `vercel.json`.                                                               |
| Cambié `.env.local` y no pasa nada                         | Vite lee las envs al arrancar: reiniciar `npm run dev`.                                               |
| Sesión perdida al volver del escáner                       | Falta `cacheLocation="localstorage"` + `useRefreshTokens` en el `Auth0Provider`.                      |

---

## 11. Auth0 y el modo offline-first

Auth0 necesita red para el login y para renovar el token. En terreno sin cobertura (§2.3):

1. El monitor **inicia sesión antes de salir** (o en el punto con señal más cercano).
2. `cacheLocation="localstorage"` + `useRefreshTokens` mantienen la sesión persistida en
   el dispositivo mientras el refresh token siga vigente.
3. Si el token expira sin red: la app **no bloquea** el registro. Las marcaciones y
   encuestas se siguen guardando localmente con `is_synced = 0`.
4. Al recuperar señal: se renueva el token y recién entonces se dispara el **batch sync**.

Esto aplica igual en la app Android (Kotlin): el token se guarda cifrado en
`EncryptedSharedPreferences` y Room sigue aceptando escrituras sin conexión.

---

## Checklist de verificación

- [ ] `npm run build` limpio en `web-react/`.
- [ ] Login y logout funcionando en `http://localhost:3000`.
- [ ] Login y logout funcionando en la URL de Vercel.
- [ ] Usuario de prueba con rol `coordinator` entra a `/panel`; uno con `attendee` recibe *acceso denegado*.
- [ ] Recargar `/panel` en Vercel devuelve 200 (no 404).
- [ ] Ningún `Client Secret` ni dato personal real en el repo.
