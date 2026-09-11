# Requisitos y apuntes ordenados

## Fuentes

- PDF: `DSY1104 Evaluación Parcial 1_EE_EP_Estudiante.pdf`, páginas 2 a 8.
- Apuntes: `jorge leal (prueba full stack ii).txt`.
- Decisión del usuario: trabajar localmente, subir avances de a poco y usar una solución básica sin extras.

## Contexto de la evaluación

- Desarrollo Fullstack II, DSY1104.
- Evaluación parcial 1: 30% de la asignatura.
- Tiempo indicado: una semana.
- Equipos de máximo tres estudiantes.
- Encargo: 40% de la evaluación. Presentación: 60%.
- Las instrucciones generales indican evaluación individual del encargo y presentación; la tabla del encargo usa el título «evaluación grupal». Conviene confirmar esa diferencia con el docente. Cada estudiante debe conocer y explicar su trabajo.
- El contexto es una tienda online. Los apuntes permiten definir el proyecto; el PDF permite casos del docente o una propuesta libre. Se debe escoger un tema que sirva para el resto del semestre.

## Obligatorio según el PDF

1. HTML5 válido y semántico: `header`, `nav`, `main`, `section`, `article` y `footer`, usados donde corresponda.
2. Hipervínculos funcionales y páginas interconectadas.
3. Imágenes correctamente insertadas, botones operativos y video embebido.
4. Formularios interactivos y pie de página informativo.
5. CSS personalizado y externo, consistente entre páginas.
6. Validación mediante JavaScript que impida procesar datos incorrectos o incompletos.
7. Etiquetas asociadas a los campos, autocompletado, sugerencias y errores personalizados junto al campo correspondiente.
8. Trabajo colaborativo en un repositorio remoto, tareas distribuidas y commits descriptivos.
9. ERS inicial con requerimientos, herramientas y propuesta.
10. Entrega del enlace público de GitHub, frontend comprimido y ERS versión 1.
11. Presentación individual del HTML, CSS, validaciones y colaboración.

## Indicaciones adicionales de los apuntes

- Páginas: `index.html`, `login.html` y `register.html`.
- Inicio con logo.
- Formularios de registro e inicio de sesión validados.
- Diseño libre y responsive.
- Una hoja de estilos por página: usaremos un único archivo externo compartido.
- Un repositorio para el equipo y los demás integrantes como colaboradores.
- Ramas `main`, una rama de desarrollo y ramas `feature/`.
- Commits semánticos y trabajo ordenado.
- Git Bash recomendado, no obligatorio.
- Bulma y otras librerías se permiten. Por decisión posterior del usuario, se usa Bulma 1.0.4 descargado localmente para botones, tarjetas y formularios.
- Zod aparece mencionado para validar formularios. Los apuntes no aclaran que sea obligatorio y la rúbrica exige JavaScript, sin nombrar una librería. Propuesta: JavaScript directo; confirmar con el docente si exige Zod.
- Canal de apoyo anotado: `docente.developer`. El enlace de YouTube de los apuntes se conserva como referencia de clase; su contenido no se ha revisado y no se usa como requisito.

## Correcciones de los apuntes de Git

- Aparecen `developer` y `develop`: propuesta de nombre único `develop`.
- `feature /uodate-readme` se ordena como `feature/update-readme`, sin espacios.
- Para una funcionalidad se usa `feat`, no `fet`. Para documentación, `docs`; para errores, `fix`; para estilo, `style`.
- `git pull origin develop` solo tiene sentido cuando esa rama remota exista y se esté trabajando en la rama adecuada. El repositorio estaba vacío al clonarlo.

## Alcance mínimo propuesto

Tema elegido: venta de proyectos digitales, solo frontend. Inicio con logo, navegación, tres proyectos de ejemplo con imágenes y precios, video relacionado y footer. Registro e inicio de sesión con validaciones y mensajes claros. Un CSS compartido y un JavaScript sencillo.

No se solicita para esta entrega carrito, compras reales, panel de administración, APIs, base de datos, React ni servidor de autenticación. No se añadirán por iniciativa propia. Validar un formulario no equivale a crear una cuenta o autenticar a alguien.
