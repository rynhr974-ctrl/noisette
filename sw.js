const CACHE_NAME = 'noisette-v11';
const assets = [
  './',
  './index.html',
  './index-ar.html',
  './style.css',
  './logo.jpg',
  './fruit.webp',
  './croissant-.webp',
  './varrines.webp',
  './patisserie.html',
  './croissants.html',
  './verrine.html'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
  )));
});

self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
