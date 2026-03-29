const CACHE = 'v4';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll([
      '/cabin-checklist/',
      '/cabin-checklist/index.html',
      '/cabin-checklist/manifest.json',
      '/cabin-checklist/favicon.png',
      '/cabin-checklist/icon-192.png'
    ]))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
