const CACHE_NAME = 'noisette-v2';
const assets = [
  './',
  './index.html',
  './style.css', // thabet f esm el css mte3ek
  './noissette-logo.jpg'   // zid hna ay image t7ebha tetkhabba offline
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
