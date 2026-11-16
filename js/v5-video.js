/* SIGNED365 · V5 | Video local/MP4 o YouTube: solo tras clic en PLAY */
(() => {
    'use strict';

    const box = document.querySelector('.video-player');
    const button = document.getElementById('video-play');
    const target = document.getElementById('video-media');
    if (!box || !button || !target) return;

    // Cambiar data-video-src en index.html para usar otro MP4 o una URL de YouTube.
    const source = (box.dataset.videoSrc || '').trim();
    const title = box.dataset.videoTitle || 'Video SIGNED365';

    function youtubeId(value) {
        try {
            const url = new URL(value, window.location.href);
            const hostname = url.hostname.toLowerCase();
            if (hostname === 'youtu.be' || hostname === 'www.youtu.be') return url.pathname.split('/')[1];
            if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(hostname)) {
                if (url.pathname === '/watch') return url.searchParams.get('v');
                const parts = url.pathname.split('/');
                if (['embed', 'shorts', 'live'].includes(parts[1])) return parts[2];
            }
        } catch (_) { return null; }
        return null;
    }

    button.addEventListener('click', () => {
        if (!source) return;
        const id = youtubeId(source);
        let player;
        if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
            player = document.createElement('iframe');
            player.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
            player.title = title;
            player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
            player.allowFullscreen = true;
            player.referrerPolicy = 'strict-origin-when-cross-origin';
        } else {
            player = document.createElement('video');
            player.src = source;
            player.controls = true;
            player.playsInline = true;
            player.preload = 'none';
        }
        target.replaceChildren(player);
        target.hidden = false;
        button.hidden = true;
        if (player.tagName === 'VIDEO') {
            player.play().catch(() => { /* El usuario puede pulsar Play en controles nativos. */ });
        }
    }, { once: true });
})();
