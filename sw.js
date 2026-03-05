const CACHE = 'hw-checker-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./index.html','./manifest.json'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('dashscope') || e.request.url.includes('siliconflow') || e.request.url.includes('fonts.googleapis')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
