// Define o nome do cache atual, considerando a sua versão.
var cacheName = "mygarage-v1.0";

// Armazena todos os arquivos no cache atual
self.addEventListener("install", function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      "/",
      "/index.html",
      "/manifest.webmanifest",
      "/assets/css/style.css",
      "/assets/js/app.js",
      "/assets/img/attach_money.svg",
      "/assets/img/placeholder_car1.png",
      "/assets/img/placeholder_car2.png",
      "/assets/img/placeholder_car3.png",
      "/assets/appicons/favicon.ico",
      "/assets/appicons/android-icon-48x48.png",
      "/assets/appicons/android-icon-72x72.png",
      "/assets/appicons/android-icon-96x96.png",
      "/assets/appicons/android-icon-144x144.png",
      "/assets/appicons/android-icon-192x192.png",
      "/assets/appicons/apple-icon-72x72.png",
      "/assets/appicons/apple-icon-120x120.png",
      "/assets/appicons/apple-icon-144x144.png",
      "/assets/appicons/apple-icon-152x152.png",
      "/assets/appicons/apple-icon-180x180.png",
    ]);
  });
});

// Recupera todos os nomes de cache e apaga aqueles
// que forem diferentes do cache atual
self.addEventListener("activate", (e) => {
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

// fetch event
self.addEventListener('fetch', evt => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(evt.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

  evt.respondWith(
    caches
      .match(evt.request)
      .then(
        cacheRes =>
          cacheRes ||
          fetch(evt.request).then(fetchRes =>
            caches.open(dynamicNames).then(cache => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            })
          )
      )
      .catch(() => caches.match('/fallback'))
  );
});