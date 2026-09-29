const CACHE_NAME = 'timetable-cache-v1';
// The files we want to save offline
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install the service worker and open the cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercept network requests and serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached file if found
        if (response) {
          return response;
        }
        // Otherwise try fetching from the network
        return fetch(event.request);
      })
  );
});
