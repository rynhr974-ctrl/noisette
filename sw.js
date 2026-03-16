const CACHE_NAME = 'noisette-v12'; // Beddelna el version l-12 bech y-faski el kdim
const assets = [
  './',
  './index.html',
  './index-ar.html',
  './style.css',
  './logo.jpg',
  './fruit.webp',
  './croissant-.webp',
  './varrines.webp', // Thabbet f'el isem bedhabt kima f'el dossier
  './patisserie.html',
  './croissants.html',
  './verrine.html',
  './manifest.json' // Zidha el manifest bech y-koun cached zeda
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets).catch(err => console.log("Famma fichié na9es wala esmou ghalat:", err));
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', e => {
  // Logic: Y-jarreb y-jib mil Net, ken mafamma chay y-jib mil Cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
