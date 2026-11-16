/* SIGNED365 V6 · Interacciones compartidas para páginas internas */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = selector => document.querySelector(selector);
  try { if (localStorage.getItem('signed365-theme') === 'dark') root.classList.add('dark'); } catch (_) {}
  $('#theme')?.addEventListener('click', () => {
    root.classList.toggle('dark');
    try { localStorage.setItem('signed365-theme', root.classList.contains('dark') ? 'dark' : 'light'); } catch (_) {}
  });
  const nav = $('#main-nav');
  const menu = $('.menu-toggle');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false');
  }));
  const dropdown = $('.nav-dropdown');
  const toggle = $('.nav-dropdown-toggle');
  const setExpanded = value => { dropdown?.classList.toggle('is-expanded', value); toggle?.setAttribute('aria-expanded', String(value)); };
  toggle?.addEventListener('click', () => setExpanded(!dropdown.classList.contains('is-expanded')));
  dropdown?.addEventListener('keydown', e => { if (e.key === 'Escape') { setExpanded(false); toggle?.focus(); } });
  document.addEventListener('click', e => { if (dropdown && !dropdown.contains(e.target)) setExpanded(false); });
  const toast = message => {
    const el = $('#toast'); if (!el) return;
    el.textContent = message; el.style.display = 'block';
    clearTimeout(toast.timer); toast.timer = setTimeout(() => el.style.display = 'none', 3500);
  };
  let fontStep = 0;
  $('#accessibility')?.addEventListener('click', () => {
    fontStep = (fontStep + 1) % 3;
    root.style.fontSize = `${100 + fontStep * 10}%`;
    toast(fontStep ? `Tamaño de texto: ${100 + fontStep * 10}%` : 'Tamaño de texto restablecido');
  });
  const elements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .09 });
    elements.forEach(el => observer.observe(el));
  } else elements.forEach(el => el.classList.add('visible'));
  const year = $('#year'); if (year) year.textContent = String(new Date().getFullYear());
})();
