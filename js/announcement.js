/* ============================================================
   SIGNED365 | V8-3 | APERTURA, CIERRE Y CAMPANA
   ============================================================ */
(() => {
    'use strict';

    /* 01. REFERENCIAS Y CONFIGURACIÓN */
    const config = window.SIGNED365_ANNOUNCEMENT_CONFIG;
    const root = document.getElementById('announcement');
    const panel = document.getElementById('announcement-panel');
    const bell = document.getElementById('announcement-bell');
    const close = document.getElementById('announcement-close');
    if (!config?.enabled || !root || !panel || !close) return;
    const delay = Number.isFinite(Number(config.delay)) ? Math.max(0, Number(config.delay)) : 5000;
    const sessionKey = 'signed365-announcement-shown:' + config.campaignId;
    let opened = false;
    let timer;
    let previousFocus;

    /* 02. ESTADO DEL PANEL Y CICLO MULTIMEDIA */
    function setOpen(value, restoreFocus = false) {
        if (value === opened) return;
        if (value) previousFocus = document.activeElement;
        opened = value;
        root.classList.toggle('is-open', opened);
        panel.setAttribute('aria-hidden', String(!opened));
        panel.inert = !opened;
        bell?.setAttribute('aria-expanded', String(opened));
        root.dispatchEvent(new CustomEvent('signed365:announcement-state', {
            detail: { open: opened }
        }));
        if (restoreFocus) {
            if (opened) close.focus();
            else if (bell && !bell.hidden) bell.focus();
            else if (previousFocus?.isConnected) previousFocus.focus();
        }
    }

    /* 03. REGISTRO DE CAMPAÑA POR SESIÓN */
    function markShown() {
        try {
            sessionStorage.setItem(sessionKey, '1');
        } catch (_) {
            // El anuncio sigue funcionando sin almacenamiento.
        }
    }

    /* 04. EVENTOS DE INTERACCIÓN */
    close.addEventListener('click', () => setOpen(false, true));
    bell?.addEventListener('click', () => {
        clearTimeout(timer);
        markShown();
        setOpen(true, true);
    });
    document.addEventListener('keydown', event => {
        const cookieDialog = document.querySelector('.sd-cookie-dialog');
        if (event.key === 'Escape' && opened && (!cookieDialog || cookieDialog.hidden)) {
            setOpen(false, true);
        }
    });

    /* 05. APERTURA AUTOMÁTICA */
    let shown = false;
    try {
        shown = sessionStorage.getItem(sessionKey) === '1';
    } catch (_) {
        // Sin almacenamiento, se permite apertura por página.
    }
    if (config.autoOpen && !shown) {
        timer = window.setTimeout(() => {
            setOpen(true);
            markShown();
        }, delay);
    }
})();
