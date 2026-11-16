/* SIGNED365 · EVOLUTION V5 | Submenú accesible */
(() => {
    'use strict';
    const dropdown = document.querySelector('.nav-dropdown');
    const toggle = document.querySelector('.nav-dropdown-toggle');
    const mainMenu = document.querySelector('#main-nav');
    if (!dropdown || !toggle || !mainMenu) return;

    function setExpanded(expanded) {
        dropdown.classList.toggle('is-expanded', expanded);
        toggle.setAttribute('aria-expanded', String(expanded));
    }

    toggle.addEventListener('click', () => {
        setExpanded(!dropdown.classList.contains('is-expanded'));
    });

    dropdown.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setExpanded(false);
            toggle.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) setExpanded(false);
    });

    dropdown.querySelectorAll('.nav-submenu a').forEach(link => {
        link.addEventListener('click', () => {
            setExpanded(false);
            mainMenu.classList.remove('open');
            document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
        });
    });
})();
