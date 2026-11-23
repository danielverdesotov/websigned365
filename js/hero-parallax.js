
/* ============================================================
   SIGNED365 | Parallax de portada (solo index.html)
   Mueve exclusivamente el fondo, sin alterar el contenido.
   ============================================================ */
(() => {
    'use strict';

    const hero = document.querySelector('#portada.hero-parallax');
    if (!hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameRequested = false;

    function updateParallax() {
        frameRequested = false;
        if (reducedMotion.matches) {
            hero.style.setProperty('--hero-parallax-offset', '0px');
            return;
        }

        const rect = hero.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        if (rect.bottom < 0 || rect.top > viewportHeight) return;

        // Posición relativa al centro de la pantalla, limitada para no recortar el fondo.
        const distance = viewportHeight / 2 - (rect.top + rect.height / 2);
        const maxOffset = window.innerWidth < 768 ? 12 : 28;
        const offset = Math.max(-maxOffset, Math.min(maxOffset, distance * 0.09));
        hero.style.setProperty('--hero-parallax-offset', `${offset.toFixed(2)}px`);
    }

    function requestUpdate() {
        if (frameRequested) return;
        frameRequested = true;
        window.requestAnimationFrame(updateParallax);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    if (reducedMotion.addEventListener) {
        reducedMotion.addEventListener('change', requestUpdate);
    }

    requestUpdate();
})();
