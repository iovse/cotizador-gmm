// Service worker mínimo del Cotizador GMM.
// Objetivo único: cumplir el criterio de instalación de Android (PWA instalable).
// A propósito NO cachea nada — las tarifas y el tipo de cambio deben pedirse
// siempre en vivo, para no mostrar precios desactualizados por una versión
// vieja guardada en caché.
const CACHE_NAME = 'cotizador-gmm-shell-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Passthrough puro: siempre red, sin fallback a caché.
  event.respondWith(fetch(event.request));
});
