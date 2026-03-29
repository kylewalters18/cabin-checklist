const CACHE = 'v6';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll([
      '/cabin-checklist/',
      '/cabin-checklist/index.html',
      '/cabin-checklist/manifest.json',
      '/cabin-checklist/favicon.png',
      '/cabin-checklist/icon-192.png',
      '/cabin-checklist/apple-touch-icon.png'
    ]))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
