/* ============================================================
   SIGNED365 | EVOLUTION V8-3 | CONFIGURACIÓN DEL ANUNCIO
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
    enabled: true,
    mode: 'youtube-cover',

    /* 02. TEXTOS */
    title: 'Información importante',
    kicker: 'SIGNED365 TE INFORMA',
    note: '.:: Verlo en YouTube ::.',
    playLabel: 'Reproducir video',
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
        src: 'https://www.youtube.com/embed/LNoWX3li9Zo?si=qmQAO90JF9ZTRh1L',
        title: 'Video oficial SIGNED365'
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
    showBell: true
};
