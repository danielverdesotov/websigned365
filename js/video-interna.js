/* SIGNED365 V6 | Video exclusivo de la portada de Facturación Electrónica.
   Cambiar data-video-src en pginter/factuelectro.html para elegir otro video. */
(() => {
  'use strict';
  const player = document.querySelector('.internal-hero-player');
  if (!player) return;
  const play = player.querySelector('.video-play-button');
  const media = player.querySelector('.video-media');
  play?.addEventListener('click', () => {
    const source = player.dataset.videoSrc || '';
    if (!source) return;
    let element;
    const youtube = source.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (youtube) {
      element = document.createElement('iframe');
      element.src = 'https://www.youtube-nocookie.com/embed/' + youtube[1] + '?autoplay=1&rel=0';
      element.title = player.dataset.videoTitle || 'Video SIGNED365';
      element.allow = 'autoplay; encrypted-media; picture-in-picture';
      element.allowFullscreen = true;
    } else {
      element = document.createElement('video');
      element.src = source;
      element.controls = true;
      element.autoplay = true;
      element.playsInline = true;
      element.preload = 'none';
    }
    media.replaceChildren(element);
    media.hidden = false;
    play.hidden = true;
    if (element.tagName === 'VIDEO') element.play().catch(() => {});
  });
})();
