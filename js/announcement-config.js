/* ============================================================
   SIGNED365 | EVOLUTION V8-3.2 | CONFIGURACIÓN DEL ANUNCIO
   Editar únicamente este archivo para cambiar la campaña.
   ============================================================ */
window.SIGNED365_ANNOUNCEMENT_CONFIG = {

    /* 01. ACTIVACIÓN Y MODALIDADES
       enabled: false = desactivar anuncio y campana.
       image         = imagen con enlace externo.
       youtube       = reproductor YouTube sin portada propia.
       local         = reproductor MP4 sin portada propia.
       youtube-cover = imagen; al pulsar, reproduce YouTube.
       local-cover   = imagen; al pulsar, reproduce MP4.
       Cambiar únicamente mode; conservar los demás bloques.
    */
    enabled: true, /* Prender/Apagar ANUNCIO */
    mode: 'youtube-cover',

    /* 02. TEXTOS */
    title: 'Información importante',
    kicker: 'SIGNED365 TE INFORMA',
    note: '.:: Verlo en YouTube ::.',
    playLabel: 'Ir al Streaming',
    /* Enlace de la nota inferior; usar '' para mostrar solo texto. */
    noteUrl: 'https://www.youtube.com/@signed365',

    /* 03. IMAGEN | Ruta relativa a la raíz del sitio */
    image: 'assets/popup/streaming365-b.png',
    imageAlt: 'Anuncio importante de SIGNED365',

    /* 04. YOUTUBE | Copiar solo el atributo src del iframe.
       Se convierte al dominio de privacidad mejorada.
       Requiere autorización de la categoría marketing.
    */
    youtube: {
        src: 'https://www.youtube.com/embed/fGr2bNd7W-Y?si=smPdAkSau32ZRXi5',
        title: 'Streaming de Lanzamiento'
    },

    /* 05. VIDEO LOCAL | Ejemplos: anuncio.mp4 (raíz),
       assets/vid/anuncio.mp4 (carpeta de videos).
       Subir el archivo antes de seleccionar local o local-cover.
    */
    localVideo: {
        src: 'assets/vid/anuncio.mp4',
        type: 'video/mp4',
        loop: false,
        muted: false
    },

    /* 06. ENLACE EXTERNO | Usado en modalidad image */
    url: 'https://www.youtube.com/@signed365',
    openNewTab: true,

    /* 07. APERTURA Y CAMPAÑA
       delay en milisegundos; 5000 = 5 segundos.
       Cambiar campaignId para mostrar una nueva campaña
       una vez por sesión, incluso si ya se mostró la anterior.
       Al cerrar se detiene el video y se restaura la portada.
    */
    autoOpen: true,
    delay: 5000,
    campaignId: 'streaming-2026-12-09',
    showBell: true,

    /* ========================================================
       08. FONDO DECORATIVO DE LA PORTADA
       Aplica a image, youtube-cover y local-cover.
       No modifica el reproductor ni el fondo de la página.
       ======================================================== */

    background: {

        /* 08.1. Activar el fondo decorativo */
        enabled: true,

        /* 08.2. Usar la imagen de la sección 03 automáticamente.
           false = utilizar customImage. */
        useCoverImage: true,

        /* 08.3. Ruta alternativa relativa a la raíz del sitio */
        customImage: '',

        /* 08.4. Desenfoque en píxeles (0 a 100) */
        blur: 10,

        /* 08.5. Opacidad de la imagen (0 a 1) */
        opacity: 0.85,

        /* 08.6. Ampliación para reducir los bordes del filtro */
        scale: 1.20,

        /* 08.7. Color alternativo si no hay imagen de fondo */
        fallbackColor: 'rgb(205, 230, 240)'


    }
};
