/* service-worker.js */

const CACHE_NAME  = "parth-v1";
const OFFLINE_URL = "./offline.html";   // leading ./ is safer on GitHub Pages

// 1.  Pre‑cache the offline shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        OFFLINE_URL,          // offline page
        "./offline.js",       // its translator script
        "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
      ])
    )
  );
  self.skipWaiting();   // activate SW immediately on first install
});

// 2.  Serve offline.html for failed *navigation* requests
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  }
});
