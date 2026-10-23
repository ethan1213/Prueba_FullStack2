# Referencias del curso y del socio formador

Todo el material entregado por el docente y por el socio formador, en un solo lugar,
con qué se usa de cada uno en este repo.

---

## 1. Caso oficial

| Recurso | Enlace / ruta | Uso en el repo |
| --- | --- | --- |
| Caso SyncPass (PDF original, 8 páginas) | [`docs/caso.pdf`](caso.pdf) | Fuente de verdad del proyecto |
| Caso SyncPass (Markdown, conversión fiel) | [`docs/CASO.md`](CASO.md) | Contexto legible y citable por sección (§2.3, §3.4, §5.1…) |

- **Asignatura:** DSY1105 · Desarrollo de Aplicaciones Móviles
- **Socio formador:** TI CONSULTING DIEGO GARCÉS MIRANDA E.I.R.L. (Ticdgm)
- **Sede / coordinador:** CITT Plaza Vespucio / Nelson Melo

---

## 2. Referencia oficial de SyncPass (docente)

**<https://github.com/docentedev/citt-sync-pass-front>**

Es la bitácora verificada paso a paso del mismo caso, hecha por el docente. De aquí sale
nuestro diseño de autenticación (ver [`docs/AUTH0.md`](AUTH0.md)).

Stack de ese repo (verificado al 2026-10-13):

| Capa | Tecnología |
| --- | --- |
| Frontend | React 19 + TypeScript 6 + Vite 8 + Tailwind v4 + wouter 3 |
| Auth | `@auth0/auth0-react` 2.x, roles por custom claim |
| Tests / Lint | vitest + jsdom + Testing Library · oxlint |
| BFF | Spring Boot 3.5 + Java 21 (`spring-boot-starter-oauth2-resource-server`) |
| Deploy | Vercel (front, push a `main`) + contenedor Java (BFF) |

Lo que adoptamos de ahí:

- Los **4 slugs de rol**: `admin`, `coordinator`, `volunteer`, `attendee`.
- El **custom claim** `https://sync-pass/roles` inyectado por Post-Login Action.
- El `audience` `https://sync-pass-api`.
- La regla de **config centralizada**: todo en un solo archivo (`src/config/auth.js`),
  cada valor desde `VITE_*` con default en duro (Vercel plan free no tiene envs).
- El patrón `RequireAuth` + `useUserRoles()` / `useHasRole()`.
- El **rewrite SPA** en `vercel.json`.
- La convención de documentación: un paso se marca ✅ **sólo cuando está verificado con
  un comando**.

Lo que **no** adoptamos por ahora (decisión del equipo, ver §4):
TypeScript, Tailwind v4 y carpeta-por-componente — mantenemos JSX + CSS propio para no
perder el front ya construido y evaluado.

---

## 3. Material de clases (React)

| Recurso | Enlace |
| --- | --- |
| Proyecto práctico de clases | <https://github.com/docentedev/fs2-react-app> |
| Guía de contenidos / temario | <https://github.com/docentedev/fs2-react-app/blob/main/docs/README.md> |
| Resultado desplegado (GitHub Pages) | <https://docentedev.github.io/fs2-react-app> |
| Proyecto 01 (octubre 2026) | <https://github.com/docentedev/fullstack-2-02> |
| Proyecto 03 — código inicial (diff) | <https://github.com/docentedev/fullstack-2-03/compare/main...feature/initial-code> |
| Video de clases: React + Vite + Wouter + Tailwind + TypeScript | <https://www.youtube.com/watch?v=Pf-ATe3FhNA> |
| Entorno del socio formador | <https://172-233-15-71.ip.linodeusercontent.com/> |

### Convenciones observadas en `fullstack-2-03` (rama `feature/initial-code`)

```
src/
  clients/<dominio>/<dominio>.client.ts   // llamadas HTTP
  clients/<dominio>/<dominio>.types.ts    // tipos de la respuesta
  components/<kebab-case>/Componente.tsx + Componente.module.css
  config/index.ts                         // configuración centralizada
  data/<recurso>.ts                       // datos estáticos / mock
  hooks/useAlgo.ts
  pages/<kebab-case>/Pagina.tsx (+ .module.css, + .utils.ts)
```

Nuestro `web-react/` sigue el **mismo reparto de responsabilidades**
(`clients/`, `config/`, `data/`, `hooks/`, `components/`, `pages/`), con extensión
`.jsx`/`.js` en lugar de `.tsx`/`.ts`.

---

## 4. Decisión de stack del equipo

| Tema | Decisión | Motivo |
| --- | --- | --- |
| Routing | **wouter** (igual que el curso) | Reemplaza el `useState` de páginas; habilita rutas reales, deep links y el rewrite de Vercel |
| Auth | **Auth0** (`@auth0/auth0-react`) | Lo exige §3.4 del caso (autenticación por roles) y es lo que usa el docente |
| Lenguaje | **JavaScript (JSX)** | Conservar el front ya construido y evaluado en EP1; migrar a TS queda como paso siguiente |
| Estilos | **CSS propio** (`src/index.css`) con tokens y dark mode | Mantener la identidad visual del proyecto; Tailwind queda como paso siguiente |
| Deploy | **Vercel** (root `web-react`) | Igual que la referencia del docente |

> Paso siguiente pendiente (no bloqueante): migración a TypeScript + Tailwind v4 +
> carpeta-por-componente + vitest, para quedar 1:1 con `citt-sync-pass-front`.

---

## 5. Stack obligatorio del caso (§5.1) y dónde se cumple

| Exigencia del caso | Dónde está en este repo |
| --- | --- |
| Kotlin + Android Studio | `mobile-kotlin/` |
| Jetpack Compose + Material Design 3 | `mobile-kotlin/app/src/main/java/.../ui/` |
| Arquitectura MVVM | `mobile-kotlin/` (capas `data/`, `ui/`) |
| Persistencia Room / SQLite | Modelo en [`docs/MODELO_BASE_DATOS.md`](MODELO_BASE_DATOS.md) (bandera `is_synced`) |
| Backend API REST (Spring Boot) + Retrofit | Contrato en [`docs/ARQUITECTURA_FULLSTACK_MOBILE.md`](ARQUITECTURA_FULLSTACK_MOBILE.md); cliente web en `web-react/src/clients/api.js` |
| Android 8.0 (API 26)+ | `mobile-kotlin/app/build.gradle.kts` (`minSdk`) |
| Áreas táctiles ≥ 48×48 dp · adaptable a distintas pantallas | [`docs/RESPONSIVE.md`](RESPONSIVE.md) |
| Modo claro y oscuro | [`docs/RESPONSIVE.md`](RESPONSIVE.md) · `ui/theme/Theme.kt` |
| Sin datos reales | [`database/seed_data.sql`](../database/seed_data.sql) — 100% ficticio |
