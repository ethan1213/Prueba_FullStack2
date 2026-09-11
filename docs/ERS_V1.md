# Especificación de Requisitos del Software

Versión 1: propuesta inicial para la Evaluación Parcial 1.

## 1. Identificación

- Proyecto académico: Proyecto Full Stack II.
- Nombre de la tienda: Proyectos Web. Temática: venta de proyectos digitales.
- Asignatura: DSY1104, Desarrollo Fullstack II.
- Integrantes: pendientes de registrar, máximo tres.
- Estado: propuesta V1 con base frontend local implementada; con el inicio publicado en el commit `2aad236` y el resto aún local.

## 2. Objetivo

Desarrollar el frontend de una tienda de proyectos digitales para mostrar proyectos y ofrecer formularios de registro e inicio de sesión con validación en JavaScript. La primera entrega establece la base del proyecto que continuará durante el semestre.

## 3. Usuarios y necesidades

Los visitantes necesitan entender qué ofrece la tienda, recorrer sus páginas y completar formularios con ayuda clara cuando se equivocan. El equipo necesita código simple, ordenado y fácil de explicar en la presentación.

## 4. Requisitos funcionales

| ID | Requisito | Aceptación prevista |
| --- | --- | --- |
| RF01 | Mostrar página de inicio con logo y presentación de la tienda. | El inicio identifica la tienda y su propósito. |
| RF02 | Permitir navegación entre inicio, login y registro. | Todos los enlaces relativos abren la página correcta. |
| RF03 | Mostrar productos mediante artículos con imágenes. | Cada producto tiene nombre, imagen visible y texto alternativo. |
| RF04 | Incluir un video relacionado con la tienda. | El video embebido reproduce y tiene controles; si es externo, se comprueba con conexión. |
| RF05 | Mostrar un footer informativo. | Las tres páginas incluyen información coherente del proyecto. |
| RF06 | Validar el formulario de registro en JavaScript. | Los datos incompletos o inválidos muestran errores y no se procesan. |
| RF07 | Validar el formulario de inicio de sesión en JavaScript. | Se revisan correo y contraseña antes de mostrar un resultado. |
| RF08 | Ayudar a completar y corregir los formularios. | Cada campo tiene label, autocomplete apropiado, sugerencia y error cercano. |
| RF09 | Dar respuesta al envío válido. | Se informa que la validación fue correcta, sin afirmar que hubo registro o autenticación real. |

## 5. Reglas de formularios propuestas

Estas reglas son decisiones de implementación sencillas; la pauta no fija campos ni longitudes exactas.

| Formulario | Campo | Regla propuesta |
| --- | --- | --- |
| Registro | Nombre | Obligatorio; al menos dos caracteres tras quitar espacios al inicio y final. |
| Ambos | Correo | Obligatorio y con formato de correo válido. |
| Registro | Contraseña | Obligatoria, mínimo ocho caracteres y no formada solo por espacios. |
| Registro | Confirmación | Debe coincidir exactamente con la contraseña. |
| Login | Contraseña | Obligatoria y no formada solo por espacios. |

Mostrar sugerencias antes de enviar, errores específicos después de validar y un mensaje de éxito solo si todos los campos son válidos. Los campos de contraseña usan `type="password"`. No guardar contraseñas en el navegador.

## 6. Requisitos no funcionales

| ID | Requisito | Comprobación prevista |
| --- | --- | --- |
| RNF01 | HTML5 semántico. | Revisar estructura, encabezados y etiquetas. |
| RNF02 | CSS personalizado externo. | Cada página enlaza `css/estilos.css`, sin estilos inline. |
| RNF03 | Diseño responsive. | Navegar y completar formularios en móvil y escritorio sin desbordamiento horizontal. |
| RNF04 | Uso claro y accesible. | Labels asociados, imágenes con alt, foco visible y navegación por teclado. |
| RNF05 | Código básico y legible. | HTML, Bulma local, CSS propio y JavaScript directo, con nombres claros. |

## 7. Herramientas

Computador del taller o personal, editor de código, navegador y herramientas de desarrollo; HTML5, CSS y JavaScript; Git para versiones y GitHub para la colaboración futura. Git Bash es una terminal recomendada. Se incorpora la biblioteca CSS Bulma 1.0.4, descargada en el proyecto con licencia MIT. No requiere npm ni instalación para abrir el sitio.

## 8. Propuesta de solución

La base utiliza tres páginas HTML, una hoja de estilos compartida, un archivo de validaciones y una carpeta de imágenes. Usar un diseño simple, con navegación superior, contenido central y footer. El logo, las imágenes y el video serán aportados por el equipo. Se retiraron los recursos de muestra; su incorporación sigue pendiente. Los precios son referenciales.

## 9. Límites y pendientes

Esta versión especifica el frontend inicial. No incluye pagos, compras, persistencia de usuarios ni autenticación real. Falta registrar integrantes y responsables; revisar el contenido del catálogo con el equipo y confirmar el uso obligatorio o no de Zod. El enlace público, la colaboración remota, el ZIP final y la exposición se completarán en las etapas correspondientes. El documento se actualizará con decisiones reales, sin completar requisitos de futuras evaluaciones por adelantado.
