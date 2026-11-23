/* ============================================================
   SIGNED365 | Parallax reutilizable del fondo del footer
   Solo modifica la posición de la imagen, no el contenido.
   ============================================================ */
(() => {
    'use strict';

    const footers = document.querySelectorAll('.footerfondo');
    if (!footers.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pendingFrame = false;

    function updateFooterParallax() {
        pendingFrame = false;
        const viewportHeight = window.innerHeight;

        footers.forEach((footer) => {
            if (reducedMotion.matches) {
                footer.style.setProperty('--footer-parallax-y', '300%');
                return;
            }

            const rect = footer.getBoundingClientRect();
            if (rect.top >= viewportHeight || rect.bottom <= 0) return;

            // 0: el footer empieza a aparecer por abajo.
            // 1: el borde inferior del footer llega al borde inferior de la pantalla.
            // Con la imagen al 115% de alto, pasar de bottom a top
            // desplaza visualmente el fondo hacia abajo sin dejar huecos.
            const distance = Math.max(rect.height, 1);
            const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / distance));
            const verticalPosition = 100 * (1 - progress);

            footer.style.setProperty('--footer-parallax-y', `${verticalPosition.toFixed(2)}%`);
        });
    }

    function scheduleUpdate() {
        if (pendingFrame) return;
        pendingFrame = true;
        window.requestAnimationFrame(updateFooterParallax);
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    if (reducedMotion.addEventListener) {
        reducedMotion.addEventListener('change', scheduleUpdate);
    } else if (reducedMotion.addListener) {
        reducedMotion.addListener(scheduleUpdate);
    }

    scheduleUpdate();
})();
