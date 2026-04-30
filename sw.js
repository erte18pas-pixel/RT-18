// Service Worker Dasar untuk PWA
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Terinstal');
});

self.addEventListener('fetch', (e) => {
  // Membiarkan browser mengambil data secara normal
});
