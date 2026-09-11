# Plan de trabajo

## Etapas pequeñas

| Orden | Trabajo | Resultado para revisar | Estado |
| --- | --- | --- | --- |
| 1 | Clonar y ordenar PDF y apuntes. | README, requisitos, ERS inicial y rúbrica. | Hecho localmente |
| 2 | Definir tema, nombre e integrantes. | Tema: proyectos digitales. Nombre: Proyectos Web. | Faltan integrantes y responsables |
| 3 | Crear inicio y navegación entre tres páginas. | HTML semántico con proyectos y footer; faltan logo, imágenes y video propios. | Base local parcial |
| 4 | Crear registro y login. | Campos con etiquetas, ayudas y autocompletado. | Base local lista; pendiente revisión del equipo |
| 5 | Añadir CSS externo. | Diseño sencillo, consistente y responsive. | Base local lista; pendiente revisión del equipo |
| 6 | Añadir validaciones JavaScript. | Errores por campo y resultado de validación. | Base local lista; pendiente revisión del equipo |
| 7 | Revisar rúbrica y corregir. | Pruebas locales registradas y sitio funcional. | Falta revisión del equipo |
| 8 | Preparar entrega y exposición. | ZIP, ERS revisada, evidencia GitHub y ensayo. | Pendiente |

La semana indicada en la pauta se puede distribuir entre estas etapas según la fecha real de entrega. No se inventa un calendario sin conocerla.

## Distribución propuesta

Completar los nombres antes de empezar el trabajo en equipo. Esta tabla es una propuesta, no evidencia de aportes ya realizados.

| Tarea | Responsable | Evidencia al terminar |
| --- | --- | --- |
| Inicio, contenido e imágenes/video | Por asignar | Cambio real revisado y commit descriptivo. |
| Formularios y validaciones | Por asignar | Código y demostración de casos válidos e inválidos. |
| CSS responsive y revisión | Por asignar | Estilos y revisión móvil/escritorio. |
| ERS y preparación de exposición | Todo el equipo | Documento actualizado y ensayo individual. |

Si son dos integrantes, repartir las tres primeras tareas entre ambos. Cada persona debe poder explicar HTML, CSS, JS y colaboración; la exposición no se divide para que alguien ignore un criterio.

## Git, de a poco

Un repositorio compartido. Propuesta de ramas: `main` para versiones revisadas, `develop` para integrar y `feature/nombre-cambio` para tareas.

El repositorio remoto estaba vacío. Ya existe el primer commit de inicio en main: `2aad236`. No se han creado ramas de trabajo. El primer commit permitirá establecer la base; luego se crearán las otras ramas cuando se usen. Por ahora no se ejecutan pushes, publicaciones ni invitaciones.

Ejemplos de mensajes para cambios futuros, no historial ya realizado:

- `docs: definir requisitos y propuesta inicial`
- `feat: agregar pagina de inicio y navegacion`
- `feat: agregar formularios de registro y login`
- `style: agregar estilos responsive`
- `feat: validar formularios con javascript`
- `fix: corregir enlaces de navegacion`

Revisar `git status` y `git diff` antes de seleccionar archivos para cada commit. Registrar avances reales a medida que se hagan, integrar las ramas del equipo y guardar evidencia de colaboración. No fabricar aportes o fechas ni subir todo ahora.

## Preparación de la presentación individual

1. Abrir el sitio y recorrer inicio, registro y login. Identificar logo, imágenes, video, botones y footer.
2. Mostrar HTML y explicar por qué nav es navegación, main es contenido principal, section agrupa temas y article representa contenido independiente, como un producto.
3. Mostrar el enlace al CSS compartido y explicar colores, espaciado y adaptación móvil. Cambiar el ancho de la ventana.
4. Enviar formularios vacíos o inválidos; explicar las condiciones JS, los mensajes y las sugerencias. Corregir los datos y demostrar el resultado válido.
5. Mostrar el historial real cuando exista: quién hizo cada tarea, cómo se nombraron los commits y cómo se integraron los cambios. Explicar que esto permite revisar aportes, coordinar el trabajo y recuperar versiones.
6. Explicar el alcance: frontend inicial y validación de entradas; las cuentas reales se resolverán si se solicitan en futuras evaluaciones.

## Antes de entregar

Completar la lista de RÚBRICA, actualizar la ERS, preparar el ZIP sin `.git` ni archivos temporales y probar una copia extraída. Verificar el enlace público de GitHub cuando se decida subir. Cada integrante ensaya con el código que realmente comprende.

## Trabajo incremental acordado

El inicio se publicó en el primer commit; el resto de la base local sirve para revisar el alcance. No implica que todas las features estén aprobadas o deban subirse juntas. Revisaremos cada una con `FEATURES.md`, simplificaremos lo necesario y solo entonces haremos sus commits cuando se indique. No se ha creado ninguna rama feature todavía.
