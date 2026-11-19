/* SIGNED365 · Gestor compartido de preferencias de cookies. */
(function () {
    'use strict';

    const cfg = window.SIGNED365_COOKIES_CONFIG;
    if (!cfg || document.getElementById('sd-cookie-root')) return;

    const storage = {
        get() {
            try { return JSON.parse(localStorage.getItem(cfg.storageKey)); }
            catch (_) { return null; }
        },
        set(value) {
            try { localStorage.setItem(cfg.storageKey, JSON.stringify(value)); }
            catch (_) { /* Navegación privada: solo se conserva en esta página. */ }
        }
    };

    const categories = cfg.categories;
    const defaults = Object.fromEntries(categories.map(item => [item.id, item.required || !!item.defaultEnabled]));
    let current = storage.get();
    if (!current || current.version !== cfg.version || !current.preferences) current = null;

    const root = document.createElement('div');
    root.id = 'sd-cookie-root';
    root.innerHTML = `
        <div class="sd-cookie-banner" role="region" aria-label="Preferencias de cookies" hidden>
            <div class="sd-cookie-copy">
                <span class="sd-cookie-eyebrow">PRIVACIDAD Y COOKIES</span>
                <p class="sd-cookie-message"></p>
                <a class="sd-cookie-policy" target="_blank" rel="noopener noreferrer"></a>
            </div>
            <div class="sd-cookie-actions">
                <button type="button" class="sd-cookie-btn sd-cookie-outline" data-cookie-action="customize">Personalizar</button>
                <button type="button" class="sd-cookie-btn sd-cookie-outline" data-cookie-action="necessary">Solo necesarias</button>
                <button type="button" class="sd-cookie-btn sd-cookie-primary" data-cookie-action="all">Aceptar todas</button>
            </div>
        </div>
        <div class="sd-cookie-backdrop" hidden></div>
        <section class="sd-cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="sd-cookie-title" tabindex="-1" hidden>
            <button type="button" class="sd-cookie-close" data-cookie-action="close" aria-label="Cerrar preferencias">×</button>
            <span class="sd-cookie-eyebrow">CONFIGURACIÓN DE COOKIES</span>
            <h2 id="sd-cookie-title"></h2>
            <p class="sd-cookie-intro"></p>
            <div class="sd-cookie-categories"></div>
            <div class="sd-cookie-dialog-footer">
                <button type="button" class="sd-cookie-btn sd-cookie-outline" data-cookie-action="necessary">Solo necesarias</button>
                <button type="button" class="sd-cookie-btn sd-cookie-outline" data-cookie-action="save">Guardar selección</button>
                <button type="button" class="sd-cookie-btn sd-cookie-primary" data-cookie-action="all">Aceptar todas</button>
            </div>
        </section>
        <button type="button" class="sd-cookie-reopen" data-cookie-action="customize" aria-label="Configurar cookies" title="Configurar cookies" hidden>Privacidad</button>
    `;
    document.body.appendChild(root);

    const banner = root.querySelector('.sd-cookie-banner');
    const backdrop = root.querySelector('.sd-cookie-backdrop');
    const dialog = root.querySelector('.sd-cookie-dialog');
    const reopen = root.querySelector('.sd-cookie-reopen');
    const categoryContainer = root.querySelector('.sd-cookie-categories');
    const policy = root.querySelector('.sd-cookie-policy');
    let previousFocus = null;

    root.querySelector('.sd-cookie-message').textContent = cfg.message;
    root.querySelector('#sd-cookie-title').textContent = cfg.settingsHeading;
    root.querySelector('.sd-cookie-intro').textContent = cfg.settingsIntro;
    policy.textContent = cfg.policyLabel;
    policy.href = cfg.policyUrl;

    categories.forEach(item => {
        const section = document.createElement('div');
        section.className = 'sd-cookie-category';
        const copy = document.createElement('div');
        const heading = document.createElement('h3');
        const desc = document.createElement('p');
        heading.textContent = item.title;
        desc.textContent = item.description;
        copy.append(heading, desc);
        section.append(copy);
        if (item.required) {
            const fixed = document.createElement('span');
            fixed.className = 'sd-cookie-required';
            fixed.textContent = 'SIEMPRE ACTIVAS';
            section.append(fixed);
        } else {
            const label = document.createElement('label');
            label.className = 'sd-cookie-switch';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.dataset.category = item.id;
            input.setAttribute('aria-label', 'Permitir ' + item.title);
            const slider = document.createElement('span');
            slider.setAttribute('aria-hidden', 'true');
            label.append(input, slider);
            section.append(label);
        }
        categoryContainer.append(section);
    });

    function syncInputs() {
        const preferences = current ? current.preferences : defaults;
        root.querySelectorAll('[data-category]').forEach(input => {
            input.checked = !!preferences[input.dataset.category];
        });
    }

    function hideDialog() {
        dialog.hidden = true;
        backdrop.hidden = true;
        document.body.classList.remove('sd-cookie-modal-open');
        if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    }

    function openDialog() {
        previousFocus = document.activeElement;
        syncInputs();
        banner.hidden = true;
        backdrop.hidden = false;
        dialog.hidden = false;
        document.body.classList.add('sd-cookie-modal-open');
        dialog.focus();
    }

    function save(preferences) {
        categories.forEach(item => { if (item.required) preferences[item.id] = true; });
        current = { version: cfg.version, preferences, updatedAt: new Date().toISOString() };
        storage.set(current);
        banner.hidden = true;
        hideDialog();
        reopen.hidden = false;
        cfg.onConsent?.(preferences);
        document.dispatchEvent(new CustomEvent('signed365:cookie-consent', { detail: { ...preferences } }));
    }

    root.addEventListener('click', event => {
        const control = event.target.closest('[data-cookie-action]');
        if (!control) return;
        const action = control.dataset.cookieAction;
        if (action === 'customize') openDialog();
        if (action === 'necessary') save({ ...defaults, ...Object.fromEntries(categories.filter(c => !c.required).map(c => [c.id, false])) });
        if (action === 'all') save(Object.fromEntries(categories.map(c => [c.id, true])));
        if (action === 'save') {
            const preferences = { ...defaults };
            root.querySelectorAll('[data-category]').forEach(input => { preferences[input.dataset.category] = input.checked; });
            save(preferences);
        }
        if (action === 'close') {
            hideDialog();
            if (!current) banner.hidden = false;
        }
    });
    backdrop.addEventListener('click', () => { hideDialog(); if (!current) banner.hidden = false; });
    document.addEventListener('keydown', event => {
        if (dialog.hidden) return;
        if (event.key === 'Escape') { event.preventDefault(); hideDialog(); if (!current) banner.hidden = false; }
        if (event.key === 'Tab') {
            const focusable = [...dialog.querySelectorAll('button, input')].filter(el => !el.disabled);
            const first = focusable[0], last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
    });

    if (current) {
        reopen.hidden = false;
        cfg.onConsent?.(current.preferences);
    } else {
        window.setTimeout(() => { if (!current && dialog.hidden) banner.hidden = false; }, cfg.delayMs);
    }
    window.SIGNED365_openCookieSettings = openDialog;
})();
