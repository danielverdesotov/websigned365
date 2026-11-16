/* SIGNED365 V8 | Filtros opcionales de Recursos y búsqueda de FAQ. */
(() => {
    'use strict';

    // 01. Recursos: filtrar por categoría sin recargar la página.
    const filters = [...document.querySelectorAll('[data-v8-filter]')];
    const cards = [...document.querySelectorAll('[data-v8-category]')];
    filters.forEach(filter => filter.addEventListener('click', () => {
        const value = filter.dataset.v8Filter;
        filters.forEach(button => {
            const selected = button === filter;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
        cards.forEach(card => {
            card.hidden = value !== 'todos' && card.dataset.v8Category !== value;
        });
    }));

    // 02. FAQ: filtrar de forma instantánea por texto de consulta o respuesta.
    const search = document.querySelector('#v8-faq-search');
    const groups = [...document.querySelectorAll('[data-v8-faq-group]')];
    const empty = document.querySelector('#v8-faq-empty');
    search?.addEventListener('input', () => {
        const needle = search.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
        let visible = 0;
        groups.forEach(group => {
            const items = [...group.querySelectorAll('details')];
            let groupVisible = 0;
            items.forEach(item => {
                const text = item.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                item.hidden = !text.includes(needle);
                if (!item.hidden) { groupVisible++; visible++; }
            });
            group.hidden = groupVisible === 0;
        });
        if (empty) empty.hidden = visible > 0;
    });
})();

// V8 | Búsqueda y categorías de preguntas frecuentes.
(() => {
  'use strict';
  const search = document.querySelector('#v8-faq-search');
  const form = document.querySelector('#v8-faq-form');
  const filters = [...document.querySelectorAll('[data-v8-faq-filter]')];
  const items = [...document.querySelectorAll('[data-v8-faq-item]')];
  const empty = document.querySelector('#v8-faq-empty');
  let active = 'Todas';
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  function update() {
    const term = normalize(search?.value || '').trim();
    let count = 0;
    items.forEach(item => {
      const show = (active === 'Todas' || item.dataset.v8FaqCategory === active) && normalize(item.textContent).includes(term);
      item.hidden = !show;
      if (show) count++;
    });
    if (empty) empty.hidden = count !== 0;
  }
  filters.forEach(button => button.addEventListener('click', () => {
    active = button.dataset.v8FaqFilter;
    filters.forEach(b => { const selected = b === button; b.classList.toggle('is-active', selected); b.setAttribute('aria-pressed', String(selected)); });
    update();
  }));
  search?.addEventListener('input', update);
  form?.addEventListener('submit', event => { event.preventDefault(); update(); document.querySelector('#preguntas')?.scrollIntoView({behavior:'smooth'}); });
})();
