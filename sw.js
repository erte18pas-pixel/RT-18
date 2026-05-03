const CACHE_NAME = 'rt18-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/icon.png',
  '/manifest.json'
];

// 1. INSTALASI: Menyimpan cangkang aplikasi ke memori HP
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Menyimpan Cache Aplikasi');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. AKTIVASI: Membersihkan cache versi lama jika ada update
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Menghapus Cache Lama');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. FETCHING: Saat HP tidak ada internet, ambil cangkang dari Cache
self.addEventListener('fetch', (event) => {
  // Biarkan request ke Google Script berjalan lewat internet langsung
  if (event.request.url.includes('script.google.com')) {
    return; 
  }

  // Untuk file HTML, Ikon, Manifest, sediakan dari memori HP agar super cepat
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
