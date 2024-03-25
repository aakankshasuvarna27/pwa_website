// Service worker code

// Version number for cache
const cacheVersion = "v1";

// Files to cache
const cacheFiles = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/images/bow_clip.jpg",
  "/images/scrunchies.jpg",
  // Add more files to cache here
];

// Install event listener
self.addEventListener("install", function (event) {
  console.log("Service Worker installed");

  // Perform install steps
  event.waitUntil(
    caches.open(cacheVersion).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(cacheFiles);
    })
  );
});

// Activate event listener
self.addEventListener("activate", function (event) {
  console.log("Service Worker activated");

  // Delete old caches
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== cacheVersion) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event listener
self.addEventListener("fetch", function (event) {
  console.log("Fetch event intercepted:", event.request.url);

  // Respond with cached resources if available, else fetch from network
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        // Return cached response if found
        if (response) {
          console.log("Cache hit:", event.request.url);
          return response;
        }

        // Fetch from network if not cached
        console.log("Cache miss. Fetching from network:", event.request.url);
        return fetch(event.request);
      })
      .catch(function (error) {
        // Handle fetch errors
        console.error("Fetch failed:", error);
        // You can return a custom offline page here if needed
      })
  );
});
