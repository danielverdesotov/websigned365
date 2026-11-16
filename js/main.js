/* SIGNED365 · SIG DV EVOLUTION | Interacciones sin dependencias externas */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (selector) => document.querySelector(selector);
  const toast = (message) => { const el = $('#toast'); el.textContent = message; el.style.display = 'block'; clearTimeout(toast.timer); toast.timer = setTimeout(() => el.style.display = 'none', 3800); };

  // 01. Tema claro / oscuro, con persistencia local.
  const storedTheme = localStorage.getItem('signed365-theme');
  if (storedTheme === 'dark') root.classList.add('dark');
  $('#theme').addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('signed365-theme', root.classList.contains('dark') ? 'dark' : 'light');
  });

  // 02. Navegación adaptable.
  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  menu.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(opened));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
  }));

  // 03. Entrada progresiva de secciones, con soporte para movimiento reducido.
  const elements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .09, rootMargin: '0px 0px -30px 0px' });
    elements.forEach(element => observer.observe(element));
  } else elements.forEach(element => element.classList.add('visible'));

  // 04. Accesibilidad: tres tamaños de letra.
  let fontStep = 0;
  $('#accessibility').addEventListener('click', () => {
    fontStep = (fontStep + 1) % 3;
    root.style.fontSize = `${100 + fontStep * 10}%`;
    toast(fontStep ? `Tamaño de texto: ${100 + fontStep * 10}%` : 'Tamaño de texto restablecido');
  });

  // 06. Acciones pendientes de integración, informadas sin simular resultados.
  document.querySelectorAll('a[href="#demo"], a[href="#acceso"], a[href="#sinlink"], a[href="#masplanes"], a[href="#administracion"], a[href="#prueba"]').forEach(link => {
    if (link.getAttribute('href') === '#prueba') return;
    link.addEventListener('click', event => { event.preventDefault(); toast('Este acceso requiere configurar la URL por el desarrollador DAV2.'); });
  });
  $('#year').textContent = new Date().getFullYear();
})();
