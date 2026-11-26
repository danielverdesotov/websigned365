/* ============================================================
   SIGNED365 | V8-3 | GENERACIÓN DEL ANUNCIO MULTIMEDIA
   ============================================================ */
(() => {
    'use strict';

    /* 01. CONFIGURACIÓN Y RUTAS */
    const config = window.SIGNED365_ANNOUNCEMENT_CONFIG;
    const mount = document.getElementById('announcement-mount');
    const bell = document.getElementById('announcement-bell');
    const siteRoot = new URL('../', document.currentScript.src);
    if (bell) bell.hidden = true;
    if (!config || !config.enabled || !mount) return;

    const modes = ['image', 'youtube', 'local', 'youtube-cover', 'local-cover'];
    const mode = modes.includes(config.mode) ? config.mode : 'image';
    const youtube = mode.startsWith('youtube');
    const cover = mode.endsWith('-cover');
    const local = mode.startsWith('local');

    /* 02. ESTRUCTURA COMPARTIDA */
    const root = document.createElement('aside');
    root.id = 'announcement';
    root.className = 'announcement';
    root.setAttribute('aria-label', 'Anuncio importante');
    root.innerHTML = `
        <div class="announcement-shade" id="announcement-shade" aria-hidden="true"></div>
        <section class="announcement-panel" id="announcement-panel" aria-labelledby="announcement-title" aria-hidden="true" inert>
            <div class="announcement-heading">
                <div>
                    <span class="announcement-kicker"></span>
                    <h2 id="announcement-title"></h2>
                </div>
                <button class="announcement-close" id="announcement-close" type="button" aria-label="Cerrar anuncio">×</button>
            </div>
            <div class="announcement-content">
                <div class="announcement-stage"></div>
                <p class="announcement-note"></p>
                <p class="announcement-status" role="status"></p>
                <div class="announcement-actions"></div>
            </div>
        </section>`;
    root.querySelector('.announcement-kicker').textContent = config.kicker;
    root.querySelector('#announcement-title').textContent = config.title;
    /* 02.1. Nota inferior con enlace opcional en nueva pestaña */
    const note = root.querySelector('.announcement-note');
    note.textContent = config.note || '';
    note.hidden = !config.note;
    if (config.note && config.noteUrl) {
        const url = new URL(config.noteUrl, siteRoot);
        if (['https:', 'http:'].includes(url.protocol)) {
            const link = document.createElement('a');
            link.href = url.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = config.note;
            note.replaceChildren(link);
        }
    }
    const stage = root.querySelector('.announcement-stage');
    const status = root.querySelector('.announcement-status');
    const actions = root.querySelector('.announcement-actions');
    let active = false;
    let consent = false;
    let consentReceived = false;

    /* 03. CONSENTIMIENTO | No cargar YouTube sin autorización */
    function readConsent() {
        try {
            const cfg = window.SIGNED365_COOKIES_CONFIG;
            if (!cfg) return false;
            const saved = JSON.parse(localStorage.getItem(cfg.storageKey));
            return saved?.version === cfg.version && saved.preferences?.marketing === true;
        } catch (_) {
            return false;
        }
    }
    document.addEventListener('signed365:cookie-consent', event => {
        consentReceived = true;
        consent = event.detail?.marketing === true;
        if (youtube && active && !consent) renderInitial();
    });

    /* 04. FUNCIONES AUXILIARES */
    function clearMedia() {
        stage.querySelectorAll('video').forEach(video => {
            video.pause();
            video.removeAttribute('src');
            video.querySelectorAll('source').forEach(source => source.remove());
            video.load();
        });
        stage.replaceChildren();
        actions.replaceChildren();
        status.textContent = '';
    }

    function button(label, callback, parent = actions) {
        const element = document.createElement('button');
        element.type = 'button';
        element.className = 'announcement-media-button';
        element.textContent = label;
        element.addEventListener('click', callback);
        parent.append(element);
        return element;
    }

    function image() {
        const element = document.createElement('img');
        element.className = 'announcement-image';
        element.src = new URL(config.image, siteRoot).href;
        element.alt = config.imageAlt;
        return element;
    }

    function youtubeUrl() {
        const url = new URL(config.youtube.src);
        if (url.protocol !== 'https:' || !['www.youtube.com', 'www.youtube-nocookie.com', 'youtube.com'].includes(url.hostname) || !/^\/embed\/[\w-]+$/.test(url.pathname)) {
            throw new Error('URL embed no válida');
        }
        url.hostname = 'www.youtube-nocookie.com';
        url.searchParams.delete('si');
        url.searchParams.set('autoplay', '0');
        return url.href;
    }

    /* 05. REPRODUCTORES | Carga únicamente con el anuncio abierto */
    function play() {
        if (!active) return;
        if (youtube && !consent) {
            status.textContent = 'Para reproducir YouTube, autoriza Publicidad y personalización en tus preferencias de privacidad.';
            if (!actions.querySelector('[data-privacy]')) {
                const privacy = button('Configurar privacidad', () => {
                    window.SIGNED365_openCookieSettings?.();
                });
                privacy.dataset.privacy = 'true';
            }
            return;
        }
        clearMedia();
        try {
            const frame = document.createElement('div');
            frame.className = 'announcement-media';
            if (youtube) {
                const iframe = document.createElement('iframe');
                iframe.src = youtubeUrl();
                iframe.title = config.youtube.title;
                iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.referrerPolicy = 'strict-origin-when-cross-origin';
                iframe.allowFullscreen = true;
                frame.append(iframe);
            } else if (local) {
                const video = document.createElement('video');
                video.controls = true;
                video.playsInline = true;
                video.preload = 'metadata';
                video.loop = !!config.localVideo.loop;
                video.muted = !!config.localVideo.muted;
                const source = document.createElement('source');
                const url = new URL(config.localVideo.src, siteRoot);
                if (url.origin !== siteRoot.origin) throw new Error('El video debe estar alojado en el sitio');
                source.src = url.href;
                source.type = config.localVideo.type;
                video.append(source);
                source.addEventListener('error', () => {
                    status.textContent = 'No se pudo cargar el video. Verifica el archivo o inténtalo nuevamente.';
                });
                frame.append(video);
            }
            stage.append(frame);
        } catch (_) {
            status.textContent = 'No se pudo preparar el reproductor. Revisa la configuración.';
            button('Reintentar', renderInitial);
        }
    }

    /* 06. MODALIDADES DE PUBLICACIÓN */
    function renderInitial() {
        clearMedia();
        if (!active) return;
        if (mode === 'image') {
            const link = document.createElement('a');
            link.className = 'announcement-link';
            const url = new URL(config.url, siteRoot);
            if (['http:', 'https:'].includes(url.protocol)) link.href = url.href;
            if (config.openNewTab) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
            link.append(image());
            stage.append(link);
        } else if (cover) {
            /* 06.1. Portada independiente y botón inferior */
            const wrapper = document.createElement('div');
            wrapper.className = 'announcement-cover';
            wrapper.append(image());
            const trigger = button(config.playLabel, play, wrapper);
            trigger.classList.add('announcement-play');
            const icon = document.createElement('span');
            icon.className = 'announcement-play-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = '▶';
            trigger.prepend(icon);
            stage.append(wrapper);
        } else if (youtube && !consent) {
            button(config.playLabel, play);
            play();
        } else {
            play();
        }
    }

    /* 07. CICLO DE APERTURA Y CIERRE */
    root.addEventListener('signed365:announcement-state', event => {
        active = event.detail.open === true;
        if (active) {
            // Conservar consentimiento recibido en memoria si no hay almacenamiento.
            if (!consentReceived) consent = readConsent();
            renderInitial();
        } else {
            clearMedia();
        }
    });
    mount.replaceChildren(root);
    if (bell) bell.hidden = !config.showBell;
})();
