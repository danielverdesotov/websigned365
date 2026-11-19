/* SIGNED365 · Configuración central del consentimiento.
   Editar este archivo para cambiar textos y categorías en todas las páginas. */
window.SIGNED365_COOKIES_CONFIG = {
    version: '2026-11-19-1',
    delayMs: 3000,
    storageKey: 'signed365_cookie_consent',
    heading: 'Tus preferencias de privacidad',
    message: 'Usamos tecnologías necesarias propias y de terceros para garantizar el correcto funcionamiento del sitio, mejorar tu experiencia de navegación y analizar el uso de nuestros servicios. Con tu aceptación autorizas el uso de cookies conforme a las finalidades descritas en nuestra Política.',
    settingsHeading: 'Elige qué cookies permites',
    settingsIntro: 'Las cookies necesarias permanecen activas. Las demás categorías son opcionales y puedes cambiar tu elección cuando quieras.',
    policyUrl: 'https://www.corporaciondfl.com/es/politicas.html#politicas',
    policyLabel: 'Consultar políticas de privacidad',
    categories: [
        {
            id: 'necessary',
            title: 'Necesarias y seguridad',
            description: 'Permiten funciones esenciales del sitio, la seguridad y el almacenamiento de tu elección de privacidad.',
            required: true
        },
        {
            id: 'analytics',
            title: 'Analítica y rendimiento',
            description: 'Ayudan a conocer cómo se utiliza el sitio para detectar errores y mejorar su funcionamiento. Incluye Microsoft Clarity cuando autorizas esta categoría.',
            required: false,
            defaultEnabled: false
        },
        {
            id: 'marketing',
            title: 'Publicidad y personalización',
            description: 'Permiten medir campañas y personalizar comunicaciones cuando se integren herramientas que requieran esta autorización.',
            required: false,
            defaultEnabled: false
        }
    ],
    /* Scripts opcionales: se ejecutan únicamente tras consentimiento. */
    onConsent: function (preferences) {
        if (preferences.analytics && !window.__signed365ClarityLoaded) {
            window.__signed365ClarityLoaded = true;
            (function (c, l, a, r, i, t, y) {
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
                t = l.createElement(r);
                t.async = true;
                t.src = 'https://www.clarity.ms/tag/' + i;
                y = l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t, y);
            })(window, document, 'clarity', 'script', 'zb1salco1y');
        }
    }
};
