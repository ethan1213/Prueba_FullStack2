# SyncPass — Acreditación QR y Vinculación Comunitaria

Proyecto del caso oficial **SyncPass** · Duoc UC · Escuela de Informática y
Telecomunicaciones · CITT Plaza Vespucio.
Socio formador: TI CONSULTING DIEGO GARCÉS MIRANDA E.I.R.L. (Ticdgm).

| | |
| --- | --- |
| **Asignaturas** | DSY1105 (Desarrollo de Aplicaciones Móviles) · DSY1104 (Full Stack II) |
| **Caso** | [`docs/CASO.md`](docs/CASO.md) · PDF original disponible en AVA |
| **Documentación** | [`docs/README.md`](docs/README.md) |

---

## El problema

La asistencia a los talleres de vinculación comunitaria se registra **en planillas de
papel**. Eso produce:

- Pérdida y deterioro de evidencia, y registros ilegibles.
- Filas de **15 a 20 minutos** en el acceso a cada actividad.
- Encuestas de satisfacción enviadas días después, con **menos del 15%** de respuesta.
- Nula operación en unidades vecinales **sin cobertura móvil**.

## La solución

| Objetivo del caso | Cómo lo resuelve SyncPass |
| --- | --- |
| Acreditar en menos de 5 segundos (hoy: 45 s) | Lectura de código QR con la cámara |
| Operar sin señal al 100% | Room/SQLite local con bandera `is_synced` y batch sync |
| Subir la respuesta de encuestas sobre el 65% | Encuesta de 1 a 5 estrellas aplicada en terreno |
| Eliminar el papel al 100% | Registro digital con marca de tiempo; georreferencia pendiente |
| Bajar 80% las horas de digitación | Reportes automáticos de quórum e impacto |

---

## Qué hay en el repositorio

Cuatro piezas que **conviven**; ninguna reemplaza a otra:

### 1. Sitio estático EP1 — raíz del repositorio

El frontend evaluado en la EP1: `index.html`, `login.html`, `register.html`, con
`css/estilos.css` (Bulma local) y `js/validaciones.js`. Se mantiene **tal cual**, con
puntos de corte añadidos para tablet y teléfono angosto.

Se abre directo con el navegador, sin instalar nada.

### 2. Aplicación web React — `web-react/`

La app del caso SyncPass: React + Vite con rutas en **wouter**, desplegada en **Vercel**.
La web **solo habla con la API**: registro, confirmación de correo e inicio de sesión
son endpoints del backend, que es quien se comunica con Amazon Cognito.

```bash
cd web-react
npm install
npm run dev     # http://localhost:3000
```

Rutas: `/` talleres · `/taller/:id` detalle y quórum · `/acreditar` escáner QR ·
`/encuesta` satisfacción · `/sincronizacion` batch sync · `/panel` quórum y reportes ·
`/login` · `/registro` · `/ep1` módulo histórico de la EP1.

### 3. API Java — `backend/`

Spring Boot 3.5 con Java 21. Corre en **EC2** con Amazon Corretto (JDK) como servicio
`systemd`, persiste en **Supabase PostgreSQL** y se publica mediante **API Gateway**.

```text
React (Vercel) ─► API Gateway ─► JAR en EC2 ─┬─► Amazon Cognito (registro, login, tokens)
                                             └─► Supabase PostgreSQL (talleres, registros)
```

```bash
cd backend
mvn test        # pruebas de la API y de autenticación
mvn package     # target/syncpass-api-1.0.0.jar
```

Despliegue y demostración: [`docs/DEMO_EC2_JAR_POSTMAN.md`](docs/DEMO_EC2_JAR_POSTMAN.md) ·
endpoints de autenticación: [`docs/COGNITO.md`](docs/COGNITO.md).

### 4. Aplicación Android — `mobile-kotlin/`

Kotlin + Jetpack Compose + Material 3, con layouts adaptativos para teléfono y tablet y
modo claro/oscuro. Ver [`mobile-kotlin/README.md`](mobile-kotlin/README.md).

---

## Modelos de datos

- **Relacional (OLTP):** [`docs/MODELO_BASE_DATOS.md`](docs/MODELO_BASE_DATOS.md) ·
  [`database/schema.sql`](database/schema.sql) · [`database/seed_data.sql`](database/seed_data.sql)
- **Multidimensional:** [`docs/MODELO_ESTRELLA_COPO_NIEVE.md`](docs/MODELO_ESTRELLA_COPO_NIEVE.md) ·
  [`database/star_schema.sql`](database/star_schema.sql)
- **Dibujos:** [`img/dibujo-modelo-estrella.svg`](img/dibujo-modelo-estrella.svg) ·
  [`img/dibujo-modelo-copo-nieve.svg`](img/dibujo-modelo-copo-nieve.svg)

## Mockups y modelo de BD

**[`SyncPass-Mockups-y-BD.html`](SyncPass-Mockups-y-BD.html) — documento para entregar.**
Un solo archivo, sin dependencias: se abre con doble clic desde cualquier carpeta, sin
servidor ni internet. Reúne las 6 vistas (web y móvil), el modelo relacional completo con
su diccionario de datos, y los diagramas de estrella y copo de nieve. También se imprime
a PDF con `Ctrl+P`.

[`mockups.html`](mockups.html) es el visor interactivo que alterna entre
escritorio, tablet y móvil. Necesita estar dentro del repositorio, porque usa
`css/estilos.css` y los SVG de `img/`.

Los wireframes en texto están en [`docs/MOCKUPS.md`](docs/MOCKUPS.md).

---

## Guías

| Para | Documento |
| --- | --- |
| Registro y login vía API con Cognito | [`docs/COGNITO.md`](docs/COGNITO.md) |
| Despliegue en EC2 con JDK y demo Postman | [`docs/DEMO_EC2_JAR_POSTMAN.md`](docs/DEMO_EC2_JAR_POSTMAN.md) |
| Responsive, modo oscuro y accesibilidad | [`docs/RESPONSIVE.md`](docs/RESPONSIVE.md) |
| Arquitectura y contrato de la API | [`docs/ARQUITECTURA_FULLSTACK_MOBILE.md`](docs/ARQUITECTURA_FULLSTACK_MOBILE.md) |
| Repos y material del docente | [`docs/REFERENCIAS_CURSO.md`](docs/REFERENCIAS_CURSO.md) |

---

## Clonar el proyecto

```bash
git clone https://github.com/ethan1213/Prueba_FullStack2.git
```

O con un clic: `clonar.bat` (Windows), `clonar.ps1` (PowerShell), `clonar.sh`
(Linux/macOS). Si la carpeta ya existe, actualizan con `git pull`.

---

## Privacidad

Alcance **MVP académico**. Todos los datos de este repositorio son **ficticios o
anonimizados**, según la restricción §5.1 del caso: no hay RUT, nombres, correos,
teléfonos ni direcciones reales, y no se incluyen credenciales productivas ni accesos
a los sistemas del socio formador.

## Dibujos (mockups y modelos de datos)

Los wireframes y los diagramas de base de datos son SVG generados por script,
con el aspecto de un diagrama de draw.io:

```bash
python tools/generar_mockups.py        # img/mockups/*.svg  (6 vistas x web/tablet/movil)
python tools/generar_diagramas_bd.py   # img/dibujo-modelo-{relacional,estrella,copo-nieve}.svg
python tools/generar_documento.py      # incrusta todo en SyncPass-Mockups-y-BD.html
```

`tools/drawio.py` contiene las primitivas de dibujo (cajas, conectores con pata
de cuervo, tablas de entidad, notas). Para cambiar un mockup se edita la función
de esa vista y se vuelve a ejecutar el script.
