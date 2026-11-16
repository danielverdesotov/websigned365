/* SIGNED365 · V6 | Anuncio único para todas las páginas.
   Edita la configuración aquí para actualizar imagen, título, enlace y texto en todo el sitio. */
(() => {
  'use strict';
  const config = {
    title: 'Información importante',
    kicker: 'SIGNED365 TE INFORMA',
    image: 'anuncio-importante.svg',
    imageAlt: 'Anuncio SIGNED365',
    url: 'https://signed365-dist.vercel.app/',
    note: '.:: Transmisión Abierta ::.',
    delay: 5000
  };
  const mount = document.getElementById('announcement-mount');
  if (!mount) return;
  const base = new URL('../assets/', document.currentScript.src);
  mount.innerHTML = `<aside aria-label="Anuncio importante" class="announcement" data-delay="5000" id="announcement">
<div aria-hidden="true" class="announcement-shade" id="announcement-shade">
</div>
<section aria-hidden="true" aria-labelledby="announcement-title" class="announcement-panel" id="announcement-panel">
<div class="announcement-heading">
<div>
<span class="announcement-kicker">
                            SIGNED365 TE INFORMA
                        </span>
<h2 id="announcement-title">
                            Información importante
                        </h2>
</div>
<button aria-label="Cerrar anuncio" class="announcement-close" id="announcement-close" title="Cerrar anuncio" type="button">
                        ×
                    </button>
</div>
<div class="announcement-content">
<a href="https://signed365-dist.vercel.app/" target="_blank">
<img alt="Anuncio SIGNED365." class="announcement-image" src="assets/anuncio-importante.svg">
<p class="announcement-note" style="text-align: center;">
                            .:: Transmisión Abierta ::.
                        </p>
</img></a>
</div>
</section>
</aside>`;
  const root = mount.querySelector('#announcement');
  root.dataset.delay = String(config.delay);
  root.querySelector('#announcement-title').textContent = config.title;
  root.querySelector('.announcement-kicker').textContent = config.kicker;
  const image = root.querySelector('.announcement-image');
  image.src = new URL(config.image, base).href;
  image.alt = config.imageAlt;
  const link = root.querySelector('.announcement-content a');
  link.href = config.url;
  link.rel = 'noopener noreferrer';
  root.querySelector('.announcement-note').textContent = config.note;
})();
