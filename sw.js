const CACHE_NAME = 'gallery-v1';
const urlsToCache = [
  '/',
  '/index.html',
  'https://unpkg.com/babylonjs@6.37.1/babylon.js',
  'https://unpkg.com/babylonjs-loaders@6.37.1/babylonjs.loaders.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
