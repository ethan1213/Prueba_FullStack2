# Documentación del proyecto

Índice de la documentación técnica. El repositorio contiene **tres entregables** que
conviven: el sitio estático de la evaluación EP1, la aplicación web React del caso
SyncPass y la aplicación Android nativa en Kotlin.

---

## 1. El caso

| Documento | Contenido |
| --- | --- |
| [`CASO.md`](CASO.md) | Caso oficial **SyncPass** completo, en Markdown y citable por sección |
| [`caso.pdf`](caso.pdf) | El PDF original de 8 páginas, tal como lo entregó el docente |
| [`REFERENCIAS_CURSO.md`](REFERENCIAS_CURSO.md) | Todos los repos, videos y enlaces del docente y del socio formador |

**Resumen del caso:** la gestión de asistencia en los proyectos de vinculación
comunitaria se hace en planillas de papel. Eso produce pérdida de evidencia, filas de
15 a 20 minutos en el acceso, encuestas de satisfacción bajo el 15% de respuesta y
nula operación en unidades vecinales sin cobertura móvil. SyncPass digitaliza la
acreditación con código QR en menos de 5 segundos, aplica la encuesta en terreno y
funciona **offline-first** con sincronización por lotes al recuperar la señal.

---

## 2. Modelos de datos

| Documento | Contenido |
| --- | --- |
| [`MODELO_BASE_DATOS.md`](MODELO_BASE_DATOS.md) | Modelo relacional (OLTP): diagrama ER y diccionario de las 8 tablas |
| [`MODELO_ESTRELLA_COPO_NIEVE.md`](MODELO_ESTRELLA_COPO_NIEVE.md) | Modelos multidimensionales para reportabilidad |

Scripts ejecutables:

- [`../database/schema.sql`](../database/schema.sql) — DDL transaccional
- [`../database/seed_data.sql`](../database/seed_data.sql) — datos **100% ficticios** (caso §5.1)
- [`../database/star_schema.sql`](../database/star_schema.sql) — modelo estrella y copo de nieve

Dibujos vectoriales: [`../img/dibujo-modelo-estrella.svg`](../img/dibujo-modelo-estrella.svg)
y [`../img/dibujo-modelo-copo-nieve.svg`](../img/dibujo-modelo-copo-nieve.svg).

---

## 3. Diseño de interfaz

| Documento | Contenido |
| --- | --- |
| [`MOCKUPS.md`](MOCKUPS.md) | Wireframes de las 6 vistas, en web y en móvil, con su comportamiento responsive |
| [`RESPONSIVE.md`](RESPONSIVE.md) | Puntos de corte, tokens, modo oscuro y accesibilidad en las tres capas |

**Documento único para entregar:**
[`../SyncPass-Mockups-y-BD.html`](../SyncPass-Mockups-y-BD.html). Autocontenido, sin CSS
ni imágenes externas: se abre con doble clic desde cualquier carpeta y se imprime a PDF
con `Ctrl+P`. Contiene las 6 vistas, el diccionario de datos de las 8 tablas y los
diagramas de estrella y copo de nieve.

Visor interactivo: [`../mockups.html`](../mockups.html). Alterna entre
💻 Escritorio, 📐 Tablet y 📱 Móvil Android. Debe abrirse dentro del repositorio,
porque enlaza `css/estilos.css` y los SVG de `img/`.

Las vistas son exactamente las seis que pide el caso. No hay pantallas inventadas.

---

## 4. Arquitectura e implementación

| Documento | Contenido |
| --- | --- |
| [`ARQUITECTURA_FULLSTACK_MOBILE.md`](ARQUITECTURA_FULLSTACK_MOBILE.md) | Arquitectura de sistemas, contrato de la API REST y MVVM en Android |
| [`AUTH0.md`](AUTH0.md) | Guía paso a paso de autenticación y roles con Auth0, y su relación con el modo offline |
| [`../mobile-kotlin/README.md`](../mobile-kotlin/README.md) | Cómo abrir el proyecto Android, layouts adaptativos y permisos |

---

## 5. Gestión del proyecto

| Documento | Contenido |
| --- | --- |
| [`REQUISITOS.md`](REQUISITOS.md) | Requisitos y apuntes ordenados |
| [`ERS_V1.md`](ERS_V1.md) | Especificación de requisitos, versión 1 |
| [`RUBRICA.md`](RUBRICA.md) | Rúbrica de evaluación y comprobaciones |
| [`PLAN.md`](PLAN.md) | Etapas, colaboración y presentación |
| [`FEATURES.md`](FEATURES.md) | Funcionalidades y ramas feature |

---

## 6. Qué hay en cada carpeta

```text
index.html                  Sitio EP1: Home con catálogo, banner y video
login.html                  Sitio EP1: inicio de sesión con validaciones JS
register.html               Sitio EP1: registro con validaciones JS
mockups.html                Visor interactivo de mockups y diagramas de BD
clonar.bat / .ps1 / .sh     Clonar y abrir el proyecto con un clic
iniciar-react.bat           Levantar el entorno de desarrollo de React

css/estilos.css             Hoja de estilos del sitio EP1 (importa Bulma local)
css/vendor/bulma.min.css    Bulma 1.0.4 local (licencia MIT en docs/licencias/)
js/validaciones.js          Validaciones de los formularios del sitio EP1

web-react/                  Aplicación web del caso SyncPass (React + Vite + Vercel)
  src/config/auth.js        Config centralizada: Auth0, audience, claim, API
  src/clients/api.js        Cliente de la API REST, incluido el batch sync
  src/hooks/useRoles.js     Lectura de roles desde el token
  src/components/           Navbar responsive, Footer, RequireAuth
  src/pages/                Las 6 vistas de SyncPass + detalle y panel de quórum
  src/pages/legacy/         Vistas E&J de la EP1, conservadas e intactas
  src/index.css             Hoja global con tokens, modo oscuro y capa responsive
  vercel.json               Rewrite SPA (sin esto, recargar /panel da 404)
  .env.example              Plantilla de variables; el real es .env.local

mobile-kotlin/              Aplicación Android nativa (Kotlin + Jetpack Compose)
  gradle/libs.versions.toml Catálogo de versiones
  app/src/main/res/         Strings, temas claro y oscuro, icono adaptativo
  app/src/main/java/...     MainActivity, pantallas, tema y layout adaptativo

database/                   Scripts SQL (transaccional y multidimensional)
docs/                       Esta documentación
img/                        Logo, banner, capturas y diagramas SVG
video/                      Video institucional (presencia-digital.mp4)
```

---

## 7. Cómo ejecutarlo

### Sitio EP1 (sin instalación)

Abrir `index.html` con el navegador. No requiere servidor ni internet: Bulma está
descargado dentro del proyecto. También sirve Live Server desde el editor.

### Aplicación web React

```bash
cd web-react
npm install
npm run dev      # http://localhost:3000
npm run build    # genera dist/ para Vercel
```

En Vercel, el *Root Directory* del proyecto es `web-react` con el preset **Vite**.
Antes de probar el login hay que registrar la URL en Auth0: ver [`AUTH0.md`](AUTH0.md).

### Aplicación Android

Ver [`../mobile-kotlin/README.md`](../mobile-kotlin/README.md). El único paso manual es
generar el Gradle wrapper la primera vez.

---

## 8. Restricciones que se respetan

Del caso §5.1:

- Alcance **MVP académico**: no es un producto en producción.
- **Cero datos personales reales.** Todo el `seed_data.sql`, las capturas y los mockups
  usan identificadores sintéticos (`PART-LF-001`, "Vecino Participante A").
- **Sin credenciales productivas** ni accesos a los sistemas del socio formador. El
  `Client Secret` de Auth0 nunca va en el frontend; `domain` y `clientId` son públicos
  de una SPA.
- Cámara y GPS **simulados** en las demostraciones, sin almacenar imágenes ni
  identificar a personas reales.
- Compatibilidad desde **Android 8.0 (API 26)** y áreas táctiles de **48×48 dp**.
