# SIGNED365 · EVOLUTION V7

## Cambios
- Fondos motivo_b.png y motivo_n.png desde assets/ según tema.
- Slider sincronizado de laptop y celular en el inicio y soluciones; transición de 3 segundos mediante js/v4.js.
- Controlador único de tema y navegación: js/v7-shared.js. Se desactivó la carga duplicada de main.js, internas.js y v5.js en las páginas actualizadas.
- Reproductor de la página pginter/factuelectro.html dentro de laptop CSS. Su URL sigue siendo independiente y configurable en `data-video-src`.
- Estilos adicionales aislados en css/v7.css.

## Uso
Abrir index.html. Las páginas internas están en pginter/. Mantener las rutas de assets/, css/ y js/.

## Observaciones
El video de YouTube requiere que el propietario permita la inserción. Algunos recursos de la carpeta de videos no se adjuntaron y no se incluyen. Las capturas no disponibles se sustituyeron temporalmente por una imagen existente.
El sitio usa Bootstrap y Google Fonts por CDN; para uso totalmente desconectado deben descargarse y servirse localmente.
