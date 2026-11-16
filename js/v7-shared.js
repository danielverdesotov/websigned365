/* SIGNED365 · EVOLUTION V7 | Navegación y tema compartidos. */
(() => {
    'use strict';
    const root = document.documentElement;
    const nav = document.querySelector('#main-nav');
    const menu = document.querySelector('.menu-toggle');
    const theme = document.querySelector('#theme');
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = dropdown?.querySelector('.nav-dropdown-toggle');

    // 01. Tema persistente, sin controladores duplicados.
    try { root.classList.toggle('dark', localStorage.getItem('signed365-theme') === 'dark'); } catch (_) {}
    theme?.addEventListener('click', () => {
        const dark = root.classList.toggle('dark');
        try { localStorage.setItem('signed365-theme', dark ? 'dark' : 'light'); } catch (_) {}
        theme.setAttribute('aria-pressed', String(dark));
    });
    theme?.setAttribute('aria-pressed', String(root.classList.contains('dark')));

    // 02. Menú móvil y segundo nivel.
    menu?.addEventListener('click', () => {
        const expanded = nav?.classList.toggle('open') || false;
        menu.setAttribute('aria-expanded', String(expanded));
    });
    const expand = value => {
        dropdown?.classList.toggle('is-expanded', value);
        dropdownToggle?.setAttribute('aria-expanded', String(value));
    };
    dropdownToggle?.addEventListener('click', event => {
        event.stopPropagation();
        expand(!dropdown.classList.contains('is-expanded'));
    });
    nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu?.setAttribute('aria-expanded', 'false');
        expand(false);
    }));
    dropdown?.addEventListener('keydown', event => {
        if (event.key === 'Escape') { expand(false); dropdownToggle?.focus(); }
    });
    document.addEventListener('click', event => {
        if (dropdown && !dropdown.contains(event.target)) expand(false);
    });

    // 03. Animaciones accesibles.
    const elements = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        }), {threshold: .09});
        elements.forEach(el => observer.observe(el));
    } else elements.forEach(el => el.classList.add('visible'));

    // 04. Accesibilidad.
    const toast = document.querySelector('#toast');
    let fontStep = 0;
    document.querySelector('#accessibility')?.addEventListener('click', () => {
        fontStep = (fontStep + 1) % 3;
        root.style.fontSize = `${100 + fontStep * 10}%`;
        if (toast) {
            toast.textContent = fontStep ? `Tamaño de texto: ${100 + fontStep * 10}%` : 'Tamaño de texto restablecido';
            toast.style.display = 'block';
            clearTimeout(window.signed365ToastTimer);
            window.signed365ToastTimer = setTimeout(() => toast.style.display = 'none', 3500);
        }
    });
    const year = document.querySelector('#year');
    if (year) year.textContent = String(new Date().getFullYear());
})();
