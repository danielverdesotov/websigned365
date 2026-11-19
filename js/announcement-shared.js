/* ============================================================
   SIGNED365 | V8 · Anuncio único para todas las páginas
   Para modificar el anuncio en todo el sitio, editar CONFIG.
   Admite PNG, JPG, SVG y WebP desde assets/popup/.
   ============================================================ */
(() => {
    'use strict';

    const CONFIG = {
        title: 'Información importante',
        kicker: 'SIGNED365 TE INFORMA',
        image: 'popup/popup-9dic.png',
        imageAlt: 'Anuncio importante de SIGNED365',
        url: 'https://evento.signed365.com/',
        note: '.:: Transmisión Abierta ::.',
        delay: 5000
    };

    // La URL absoluta se calcula desde la carpeta js/, no desde el HTML.
    const assetsRoot = new URL('../assets/', document.currentScript.src);
    const mount = document.querySelector('#announcement-mount');
    if (!mount) return;

    const root = document.createElement('aside');
    root.className = 'announcement';
    root.id = 'announcement';
    root.setAttribute('aria-label', 'Anuncio importante');
    root.dataset.delay = String(CONFIG.delay);
    root.innerHTML = `
        <div class="announcement-shade" id="announcement-shade" aria-hidden="true"></div>
        <section class="announcement-panel" id="announcement-panel" aria-labelledby="announcement-title" aria-hidden="true">
            <div class="announcement-heading">
                <div>
                    <span class="announcement-kicker"></span>
                    <h2 id="announcement-title"></h2>
                </div>
                <button class="announcement-close" id="announcement-close" type="button" aria-label="Cerrar anuncio">×</button>
            </div>
            <div class="announcement-content">
                <a target="_blank" rel="noopener noreferrer" class="announcement-link">
                    <img class="announcement-image" alt="" />
                    <p class="announcement-note"></p>
                </a>
            </div>
        </section>`;

    root.querySelector('.announcement-kicker').textContent = CONFIG.kicker;
    root.querySelector('#announcement-title').textContent = CONFIG.title;
    const image = root.querySelector('.announcement-image');
    image.src = new URL(CONFIG.image, assetsRoot).href;
    image.alt = CONFIG.imageAlt;
    root.querySelector('.announcement-link').href = CONFIG.url;
    root.querySelector('.announcement-note').textContent = CONFIG.note;
    mount.replaceChildren(root);
})();
