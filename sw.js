const CACHE_NAME = 'movie-guide-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/movie.css',
    '/movie.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/star-icon.webp'
];

// Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

// Fetch events
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // Return cached version or fetch new
            return response || fetch(event.request);
        })
    );
});