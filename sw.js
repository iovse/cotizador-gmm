// Service worker mínimo del Cotizador GMM.
// Objetivo único: cumplir el criterio de instalación de Android (PWA instalable).
// A propósito NO cachea nada — las tarifas y el tipo de cambio deben pedirse
// siempre en vivo, para no mostrar precios desactualizados por una versión
// vieja guardada en caché.
const CACHE_NAME = 'cotizador-gmm-shell-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Para el documento HTML (la app en sí, abierta desde el ícono o navegador)
  // forzamos "cache: no-store" para saltarnos por completo la caché HTTP del
  // navegador/PWA y pedir siempre la versión más reciente al servidor.
  // Esto es lo que hacía que la PWA instalada no reflejara actualizaciones.
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(fetch(req, { cache: 'no-store' }));
    return;
  }
  // Passthrough puro para el resto: siempre red, sin fallback a caché.
  event.respondWith(fetch(req));
});
