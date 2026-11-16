/* ============================================================
   SIGNED365 V6 | Sincronización visual de computador y celular
   El temporizador y los indicadores los controla ../js/v4.js.
   No se crea otro intervalo ni se modifica el slider del home.
   ============================================================ */
(() => {
  'use strict';
  const stage = document.querySelector('#portada-soluciones .devices-stage');
  if (!stage) return;
  const laptopSlides = [...stage.querySelectorAll('.laptop-screen .hero-slide')];
  const phoneSlides = [...stage.querySelectorAll('.phone-slide')];
  const sync = () => {
    const active = laptopSlides.findIndex(slide => slide.classList.contains('is-active'));
    phoneSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === active));
  };
  const observer = new MutationObserver(sync);
  laptopSlides.forEach(slide => observer.observe(slide, {attributes:true, attributeFilter:['class']}));
  sync();
})();
