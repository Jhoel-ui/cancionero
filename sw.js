// Guarda la página en el teléfono para que abra sin señal.
const CACHE = "cancionero-v15";
const ARCHIVOS = ["./", "index.html", "css/app.css", "js/ministerio.js", "media/portada.jpg", "media/logo-renovacion.webp", "media/logo-renuevo.webp", "js/config.js", "js/acordes.js", "js/datos.js", "js/sacar.js", "js/app.js", "js/vendor/Sortable.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Primero la red (para tener siempre lo último); si no hay señal, lo guardado.
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.hostname.endsWith("googleapis.com") && url.pathname.includes("/google.firestore")) return;
  // El video de la portada va directo (el navegador lo pide por partes); sin señal se muestra la imagen final.
  if (url.pathname.endsWith(".mp4")) return;
  e.respondWith(
    // Los archivos de la página se revalidan siempre, para que un cambio se vea al recargar.
    fetch(url.origin === location.origin ? new Request(e.request, { cache: "no-cache" }) : e.request).then((r) => {
      if (r.ok && (url.origin === location.origin || url.hostname.includes("gstatic") || url.hostname.includes("cdnjs") || url.hostname.includes("fonts"))) {
        const copia = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia));
      }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
