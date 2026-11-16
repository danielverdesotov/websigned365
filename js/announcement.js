/* SIGNED365 | Anuncio IMPORTANTE: sin dependencias y sin bloquear navegación */
(() => {
    'use strict';

    const root = document.getElementById('announcement');
    const panel = document.getElementById('announcement-panel');
    const tab = document.getElementById('announcement-bell');
    const close = document.getElementById('announcement-close');
    if (!root || !panel || !tab || !close) return;

    const delay = Math.max(0, Number(root.dataset.delay) || 5000);
    const sessionKey = 'signed365-announcement-shown';
    let opened = false;

    function setOpen(value, restoreFocus = false) {
        opened = value;
        root.classList.toggle('is-open', opened);
        panel.setAttribute('aria-hidden', String(!opened));
        tab.setAttribute('aria-expanded', String(opened));
        // Hidden controls must not remain keyboard-focusable.
        if ('inert' in panel) panel.inert = !opened;
        if (restoreFocus) (opened ? close : tab).focus();
    }

    setOpen(false);
    close.addEventListener('click', () => setOpen(false, true));
    tab.addEventListener('click', () => setOpen(true, true));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && opened) setOpen(false, true);
    });

    // Mostrar una sola vez automáticamente por sesión. La pestaña sigue disponible.
    let shown = false;
    try { shown = sessionStorage.getItem(sessionKey) === '1'; } catch (_) {}
    if (!shown) {
        window.setTimeout(() => {
            setOpen(true);
            try { sessionStorage.setItem(sessionKey, '1'); } catch (_) {}
        }, delay);
    }
})();
