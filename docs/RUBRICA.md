# Rúbrica y comprobaciones

Fuente: PDF de evaluación, páginas 5 a 8. Los porcentajes siguientes suman 100% de esta evaluación, que pesa 30% de la asignatura. Planificar un indicador no significa haberlo cumplido.

## Matriz completa

| Indicador | Peso | Qué se debe demostrar | Evidencia prevista | Estado |
| --- | --- | --- | --- | --- |
| IE1.1.1 | 8% | HTML actual, navegación, imágenes, botones, video, formularios y footer. | Tres HTML funcionando y demostración de cada elemento. | Parcial: faltan imágenes, logo y video propios |
| IE1.1.2 | 10% | CSS personalizado enlazado externamente. | Hoja compartida, enlaces en los HTML y resultado visual. | Base implementada y comprobada localmente |
| IE1.2.1 | 10% | Validaciones JavaScript, sugerencias y errores personalizados. | Archivo JS y pruebas de los dos formularios. | Base implementada y comprobada localmente |
| IE1.3.1 | 12% | Cambios remotos coherentes, commits claros y tareas distribuidas. | Historial real del equipo, ramas e integraciones en GitHub. | Pendiente; trabajo local por ahora |
| IE1.1.3 | 10% | Explicar estructura HTML y semántica. | Explicación individual usando el código. | Pendiente de presentación |
| IE1.1.4 | 15% | Explicar CSS personalizado, externo y mantenible. | Explicación del archivo y demostración responsive. | Pendiente de presentación |
| IE1.2.2 | 15% | Demostrar validación JS con sugerencias y errores. | Envíos inválidos, corrección y envío válido durante la exposición. | Pendiente de presentación |
| IE1.3.2 | 20% | Justificar cambios coherentes y colaboración distribuida. | Explicar aportes reales, commits e integración del equipo. | Pendiente de colaboración y presentación |

Encargo: 40%. Presentación: 60%. Niveles: muy buen desempeño 100%, buen desempeño 80%, aceptable 60%, incipiente 30% y no logrado 0%. Cumplir el máximo depende del funcionamiento y de la demostración individual, no solo de tener archivos.

## Revisión del sitio

- [x] Las tres páginas tienen doctype, idioma español, charset, viewport y título adecuado.
- [x] La estructura usa header, nav, main, section, article y footer de forma adecuada.
- [ ] Agregar logo e imágenes propios con texto alternativo.
- [x] Todos los enlaces abren el destino correcto desde cada página.
- [x] Todos los botones realizan una acción coherente.
- [ ] Agregar y probar el video elegido por el equipo.
- [x] Footer informativo en las tres páginas.
- [x] Una hoja CSS externa personalizada por página, compartida entre ellas.
- [x] Sin desbordamiento horizontal en móvil; probar al menos 360 px y escritorio.
- [ ] Revisar con el equipo el recorrido completo por teclado; labels y autocompletado ya implementados.

## Pruebas manuales de formularios

| Caso | Resultado esperado | Estado |
| --- | --- | --- |
| Enviar registro vacío | Errores en los campos obligatorios, sin éxito. | Comprobado localmente |
| Nombre solo con espacios | Error de nombre. | Comprobado localmente |
| Correo sin formato válido, en ambos formularios | Error de correo. | Comprobado localmente |
| Contraseña de registro menor a ocho caracteres | Error de longitud. | Comprobado localmente |
| Contraseña formada solo por espacios | Error de contraseña. | Comprobado localmente |
| Confirmación distinta | Error de coincidencia. | Comprobado localmente |
| Registro válido | Mensaje de validación correcta, sin simular creación real de cuenta. | Comprobado localmente |
| Enviar login vacío | Errores de correo y contraseña. | Comprobado localmente |
| Login con formato válido | Mensaje de validación correcta, sin afirmar identidad autenticada. | Comprobado localmente |
| Corregir valores y volver a enviar | Se actualizan o desaparecen errores resueltos. | Comprobado localmente |
| Revisar consola y navegación | Sin errores JS ni recursos locales faltantes. | Comprobado localmente |

## Entregables y evidencia humana

- [x] Repositorio clonado localmente.
- [x] Requisitos organizados y propuesta ERS V1 redactada.
- [ ] Registrar integrantes y responsables; temática definida: proyectos digitales.
- [x] Implementar y comprobar la base del frontend local.
- [ ] Revisar cada funcionalidad con el equipo antes de incorporarla al historial.
- [ ] Incorporar colaboradores y subir aportes reales progresivamente cuando se autorice.
- [ ] Verificar que el enlace GitHub sea público antes de la entrega.
- [ ] Generar ZIP del frontend final y comprobar que funcione al extraerlo.
- [ ] Entregar ERS V1 en el formato solicitado por el docente; el PDF de pauta no fija formato.
- [ ] Ensayar y realizar la presentación individual.

Mientras no se hagan los aportes remotos y la presentación, esos criterios siguen pendientes aunque el sitio funcione localmente.

## Comprobación local

Antes de retirar los recursos de muestra, se probó la base en Microsoft Edge, abriendo los archivos directamente. Resoluciones: 360 y 1280 px. Se verificaron enlaces, imágenes, video reproducible, un CSS enlazado por HTML, formularios inválidos/válidos y ausencia de errores JavaScript. Se revisaron visualmente el inicio de escritorio y el registro móvil. Esto no sustituye la revisión del docente ni el ensayo individual.

Actualización: se quitaron el logo, las imágenes y el video de muestra a pedido del equipo. Se revisaron los enlaces y referencias locales restantes. Los recursos visuales se incorporarán más adelante.
