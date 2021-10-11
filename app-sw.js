// Define o nome do cache atual, considerando a sua versão.
var cacheName = 'mygarage-v1.0';

// Armazena todos os arquivos no cache atual
self.addEventListener('install', function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      '/',
      '/index.html',
      '/manifest.webmanifest',
      '/assest/css/style.css',
      '/app.js',
      '/assets/icons/favicon.ico',
      '/assets/icons/android-icon-48x48.png',
      '/assets/icons/android-icon-72x72.png',
      '/assets/icons/android-icon-96x96.png',
      '/assets/icons/android-icon-144x144.png',
      '/assets/icons/android-icon-192x192.png',
      '/assets/icons/apple-icon-72x72.png',
      '/assets/icons/apple-icon-120x120.png',
      '/assets/icons/apple-icon-144x144.png',
      '/assets/icons/apple-icon-152x152.png',
      '/assets/icons/apple-icon-180x180.png',
    ]);
  });
});


// Recupera todos os nomes de cache e apaga aqueles
// que forem diferentes do cache atual
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Tenta servir o arquivo do cache atual. Se não for possível,
// baixa o recurso da web e o armazena localmente, antes de entregar
// uma cópia para o usuário.
self.addEventListener('fetch', function (event) {
  let resposta = caches.open(cacheName).then((cache) => {
    return cache.match(event.request).then((recurso) => {
      if (recurso) return recurso;
      return fetch(event.request).then((recurso) => {
        cache.put(event.request, recurso.clone());
        return recurso;
      });
    });
  });
  event.respondWith(resposta);
});