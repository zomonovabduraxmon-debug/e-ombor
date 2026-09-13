const CACHE_PREFIX = 'permit-tracker-shell-';
const CACHE = CACHE_PREFIX + 'v24';
const APP_SHELL = [
  './',
  './index.html',
  './config.js',
  './sync-core.js',
  './offline-sync.js',
  './manifest.webmanifest',
  './icon.svg',
  './bg-icon.png',
  './logo.png',
  './logo-symbol-v16.png',
  './client-final-fixed.css',
  './ui-v23.css',
  './design.css',
  './ui-v23.js',
  './textile-bg-v11.svg',
  './textile-rolls-v11.svg',
  './textile-v9.svg',
  './textile-v10.svg',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(async cache => {
      for(const url of APP_SHELL){
        try{ await cache.add(new Request(url, { cache:'reload' })); }catch(_){ }
      }
    }).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX) && k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if(url.hostname.endsWith('.supabase.co')) return;

  event.respondWith((async()=>{
    // Online: always prefer the newest deployed app. Offline: use the cached shell.
    try{
      const response = await fetch(event.request, { cache:'no-cache' });
      if(response && (response.ok || response.type === 'opaque')){
        const cache = await caches.open(CACHE);
        cache.put(event.request, response.clone()).catch(()=>{});
      }
      return response;
    }catch(err){
      const cached = await caches.match(event.request);
      if(cached) return cached;
      if(event.request.mode === 'navigate'){
        const fallback = await caches.match('./index.html');
        if(fallback) return fallback;
      }
      throw err;
    }
  })());
});
