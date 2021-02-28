var CACHE_NAME = 'LD-Cafe-PWA-Cache';
var docToCache = [
    '/',
    '/bootstrap',
    '/img',
    '/jquery',
    '/popper',
    'index.html',
    'about.html',
    'delivery.html',
    'dinein.html',
];

//Install SW
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(docToCache);
            })
    );
});

//Fetch Cache
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

//Activate Cache
self.addEventListener('activate', function (event) {
    var cacheAllowlist = ['LD-Cafe-PWA-Cache'];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});