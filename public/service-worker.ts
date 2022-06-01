// Choose a cache name
const cacheName = "tomato-cache-v1";
// List the files to precache
const precacheResources = [
  "/",
  "/index.html",
  "/logo192.png",
  "/logo512.png",
  "/favicon.ico",
  "/favicon.svg",
];

// When the service worker is installing, open the cache and add the precache resources to it
window.addEventListener("install", (event: any) => {
  console.log("Service worker install event!");
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

window.addEventListener("activate", (event) => {
  console.log("Service worker activate event!");
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
window.addEventListener("fetch", (event: any) => {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
