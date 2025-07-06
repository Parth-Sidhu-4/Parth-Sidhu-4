const CACHE_NAME = "parth-v1";
const OFFLINE_URLS = [
  "offline.html",
  "offline.js",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("offline.html"))
    );
  }
});
