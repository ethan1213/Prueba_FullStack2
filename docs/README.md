# Proyecto Full Stack II

Evaluación Parcial 1 de DSY1104: Construyendo las bases para mi aplicación web.

## Estado

Repositorio clonado y base frontend implementada localmente. Primer avance subido a main: `2aad236` (inicio, estilos y documentación mínima). Los formularios, validaciones y documentos restantes siguen locales. Las funcionalidades y las ramas se revisarán de a poco.

## Qué incluye

Una tienda de proyectos digitales llamada Proyectos Web, con inicio, registro e inicio de sesión. Usa HTML, Bulma, CSS propio y JavaScript básico. El catálogo muestra tres proyectos de ejemplo. El proyecto continuará durante el semestre.

Usaremos código básico que cada integrante pueda entender y explicar. En esta evaluación se validarán formularios en el navegador; no se requiere implementar backend, base de datos, pagos ni autenticación real.

## Documentación

- [Requisitos y apuntes ordenados](REQUISITOS.md)
- [ERS, propuesta inicial versión 1](ERS_V1.md)
- [Rúbrica y comprobaciones](RUBRICA.md)
- [Etapas, colaboración y presentación](PLAN.md)
- [Funcionalidades y ramas feature](FEATURES.md)

## Estructura

```text
index.html
login.html
register.html
css/estilos.css
css/vendor/
js/validaciones.js
img/
video/
docs/
```

Cada HTML enlaza `css/estilos.css`, que importa la copia local de Bulma 1.0.4. Las clases de Bulma resuelven botones, tarjetas y campos; nuestro CSS ajusta distribución y tamaños.

## Cómo abrirlo

Desde la carpeta del proyecto, abrir `index.html` con el navegador (está un nivel arriba de esta documentación). No requiere instalación, servidor ni internet. Bulma está descargado dentro del proyecto. También se puede usar Live Server desde el editor.

La base anterior se comprobó en Edge a 360 y 1280 px, con formularios válidos e inválidos. En la revisión actual se retiraron las imágenes y el video de muestra.

Por ahora no hay imágenes ni video. El equipo agregará sus propios recursos en `img/` y `video/`. Estos puntos siguen pendientes en la rúbrica. Bulma se distribuye con su licencia MIT en `docs/licencias/LICENSE-Bulma.txt`. Referencia: [instalación oficial de Bulma](https://bulma.io/documentation/start/installation/).

## Entrega final

La pauta exige enlace público de GitHub, frontend comprimido y ERS versión 1, además de una presentación individual. El inicio ya tiene su primera subida; los demás avances quedan locales; las subidas se harán progresivamente cuando corresponda.
