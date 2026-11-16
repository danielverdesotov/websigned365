/* ==========================================================
   SIGNED365 · EVOLUTION V4 | Componentes interactivos
   ========================================================== */
(() => {
    'use strict';

    // 01. Slider de portada: transición cada 3 segundos.
    const slides = [...document.querySelectorAll('.hero-slide')];
    const dots = [...document.querySelectorAll('.slider-indicators button')];
    let currentSlide = 0;

    function showSlide(index) {
        currentSlide = index;
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === index);
            if (i === index) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
    if (slides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.setInterval(() => {
            if (!document.hidden) showSlide((currentSlide + 1) % slides.length);
        }, 3000);
    }

    // 02. Requisitos por tipo de solicitante.
    const requirementTabs = [...document.querySelectorAll('.requirements-tabs [role="tab"]')];
    requirementTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateRequirement(index));
        tab.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + requirementTabs.length) % requirementTabs.length;
            activateRequirement(next);
            requirementTabs[next].focus();
        });
    });

    function activateRequirement(index) {
        requirementTabs.forEach((tab, i) => {
            const selected = i === index;
            tab.classList.toggle('is-active', selected);
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
            document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
        });
    }

    // 03. Temporizador: fecha y hora de Ecuador continental (UTC−5).
    // Ecuador continental no aplica horario de verano.
    const signedDay = document.getElementById('signed-day');
    const hours = document.getElementById('sd-hours');
    const minutes = document.getElementById('sd-minutes');
    const seconds = document.getElementById('sd-seconds');
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Guayaquil',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hourCycle: 'h23', weekday: 'short'
    });

    function updateSignedDay() {
        if (!signedDay) return;
        const parts = Object.fromEntries(formatter.formatToParts(new Date()).map(part => [part.type, part.value]));
        const isThursday = parts.weekday === 'Thu';
        signedDay.hidden = !isThursday;
        if (!isThursday) return;
        const remaining = 86400 - (Number(parts.hour) * 3600 + Number(parts.minute) * 60 + Number(parts.second));
        hours.textContent = String(Math.floor(remaining / 3600)).padStart(2, '0');
        minutes.textContent = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
        seconds.textContent = String(remaining % 60).padStart(2, '0');
    }
    updateSignedDay();
    window.setInterval(updateSignedDay, 1000);
    document.addEventListener('visibilitychange', updateSignedDay);

    // 04. Modal legal: contenido demostrativo en cinco categorías.
    const legal = document.getElementById('legal-modal');
    const legalBody = document.getElementById('legal-body');
    const legalTexts = {
        cookies: ['Uso de Cookies', 'Texto de ejemplo: aquí se describirán las cookies utilizadas, sus finalidades y cómo configurar las preferencias del navegador.'],
        datos: ['Protección de Datos', 'Texto de ejemplo: esta sección informará sobre los principios y medidas adoptadas para proteger la información personal.'],
        terminos: ['Términos & Condiciones', 'Texto de ejemplo: aquí se definirán las condiciones de acceso, registro, uso de la plataforma y responsabilidades de los usuarios.'],
        promos: ['Promociones & Beneficios', 'Texto de ejemplo: aquí se publicarán las condiciones, vigencias, restricciones y requisitos de las campañas comerciales y beneficios por referidos.'],
        tratamiento: ['Tratamiento de Datos Personales', 'Texto de ejemplo: esta sección explicará las finalidades del tratamiento, los derechos de los titulares y los canales para ejercerlos.']
    };
    const legalTabs = [...document.querySelectorAll('[data-legal]')];
    const legalOpen = document.getElementById('legal-open');
    if (legal && legalOpen) {
        legalOpen.addEventListener('click', () => {
            if (typeof legal.showModal === 'function') legal.showModal();
        });
        ['legal-close', 'legal-dismiss'].forEach(id => {
            document.getElementById(id)?.addEventListener('click', () => legal.close());
        });
        legal.addEventListener('click', event => {
            if (event.target === legal) legal.close();
        });
        legalTabs.forEach(tab => tab.addEventListener('click', () => {
            legalTabs.forEach(item => {
                const active = item === tab;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-selected', String(active));
            });
            const [title, paragraph] = legalTexts[tab.dataset.legal];
            legalBody.replaceChildren();
            const h = document.createElement('h3');
            h.textContent = title;
            const p = document.createElement('p');
            p.textContent = paragraph;
            legalBody.append(h, p);
        }));
    }
})();
