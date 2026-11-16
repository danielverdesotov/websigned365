/* V7 · Sincronización de las capturas en laptop y móvil. El tiempo lo controla v4.js. */
(() => {
    'use strict';
    document.querySelectorAll('.devices-stage').forEach(stage => {
        const laptop = [...stage.querySelectorAll('.laptop-screen .hero-slide')];
        const phone = [...stage.querySelectorAll('.phone-slide')];
        if (!laptop.length) return;
        const sync = () => {
            const index = laptop.findIndex(item => item.classList.contains('is-active'));
            phone.forEach((item, i) => item.classList.toggle('is-active', i === index));
        };
        const observer = new MutationObserver(sync);
        laptop.forEach(item => observer.observe(item, {attributes:true,attributeFilter:['class']}));
        sync();
    });
})();
