/* Portada de la iglesia Alto Ballivián: el video (la paloma se divide en dos) y los dos ministerios para elegir.
   Cada ministerio tiene sus propios datos, equipo y colores; la separación de verdad la ponen las reglas de Firestore.
   Al elegir se carga el cancionero de ese ministerio. Tocar el video lo salta al final. */
(function (global) {
  "use strict";

  // "prefijo": dónde viven sus datos en Firestore. Renovación se queda en la raíz, como siempre.
  // "dueno": su primer líder (el que arma la lista del equipo). Tiene que coincidir con firestore.rules.
  // "admin": control total mientras Rodri enseña a usar la página (Renuevo lo sabe). Quitar aquí y en las reglas cuando ya no haga falta.
  const MINISTERIOS = {
    renovacion: {
      id: "renovacion", nombre: "Renovación", logo: "media/logo-renovacion.webp",
      prefijo: "", dueno: "rojasaire@gmail.com", colorBarra: "#f7f1e6",
    },
    renuevo: {
      id: "renuevo", nombre: "Renuevo", logo: "media/logo-renuevo.webp",
      prefijo: "ministerios/renuevo/", dueno: "jd.nivek123@gmail.com", admin: "rojasaire@gmail.com", colorBarra: "#f4f7fb",
    },
  };
  const SCRIPTS = ["js/config.js", "js/acordes.js", "js/datos.js", "js/sacar.js", "js/app.js"];
  const FIN_VIDEO = 5.2; // segundo en que las dos palomas ya se volvieron medallones

  function cargar(src) {
    return new Promise((ok, mal) => {
      const s = document.createElement("script");
      s.src = src; s.onload = ok; s.onerror = mal;
      document.body.appendChild(s);
    });
  }

  async function entrar(id) {
    const m = MINISTERIOS[id];
    global.MINISTERIO = m;
    const raiz = document.documentElement;
    raiz.dataset.ministerio = m.id;
    document.title = "Cancionero " + m.nombre;
    const color = document.querySelector('meta[name="theme-color"]');
    if (color) color.content = m.colorBarra;
    document.querySelectorAll("[data-ministerio-nombre]").forEach((el) => { el.textContent = m.nombre; });
    document.querySelectorAll("[data-ministerio-titulo]").forEach((el) => { el.textContent = "Ministerio de Alabanza " + m.nombre; });
    for (const src of SCRIPTS) await cargar(src);
  }

  function portada() {
    const raiz = document.documentElement;
    const capa = document.createElement("div");
    capa.className = "puerta";
    capa.innerHTML = `
      <div class="puerta__marco">
        <video class="puerta__video" poster="media/portada.jpg" muted playsinline preload="auto" aria-hidden="true">
          <source src="media/portada.mp4" type="video/mp4"><source src="media/portada.webm" type="video/webm"></video>
        <button class="puerta__min puerta__min--renovacion" data-ir="renovacion" aria-label="Entrar a Renovación">
          <img src="${MINISTERIOS.renovacion.logo}" alt=""><span>Renovación</span></button>
        <button class="puerta__min puerta__min--renuevo" data-ir="renuevo" aria-label="Entrar a Renuevo">
          <img src="${MINISTERIOS.renuevo.logo}" alt=""><span>Renuevo</span></button>
        <p class="puerta__saltar">Toca para saltar</p>
      </div>`;
    raiz.appendChild(capa);
    raiz.style.overflow = "hidden";
    const color = document.querySelector('meta[name="theme-color"]');
    if (color) color.content = "#0d0f14";
    const video = capa.querySelector("video");

    let listos = false;
    const mostrarBotones = () => {
      if (listos) return;
      listos = true;
      capa.classList.add("puerta--lista");
      capa.querySelector(".puerta__min").focus({ preventScroll: true });
    };
    const saltar = () => {
      if (listos) return;
      try { if (video.duration) video.currentTime = Math.max(FIN_VIDEO, video.duration - 0.05); } catch (_) {}
      video.pause();
      mostrarBotones();
    };
    video.addEventListener("timeupdate", () => { if (video.currentTime >= FIN_VIDEO) mostrarBotones(); });
    video.addEventListener("ended", mostrarBotones);
    // Si ningún formato sirve, el error llega en la última <source>.
    video.querySelector("source:last-of-type").addEventListener("error", () => { capa.classList.add("puerta--quieta"); mostrarBotones(); });
    // Sin movimiento (o si el teléfono no deja reproducir): la imagen final con los dos botones.
    const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto) { capa.classList.add("puerta--quieta"); mostrarBotones(); }
    else {
      const p = video.play();
      if (p && p.catch) p.catch(() => { capa.classList.add("puerta--quieta"); mostrarBotones(); });
    }
    setTimeout(mostrarBotones, 9000); // por si el video no avanza

    capa.addEventListener("click", async (e) => {
      const b = e.target.closest("[data-ir]");
      if (!b || !listos) return saltar();
      capa.classList.add("puerta--sale");
      raiz.style.overflow = "";
      setTimeout(() => capa.remove(), 300);
      await entrar(b.dataset.ir);
    });
    addEventListener("keydown", function k(e) {
      if (e.key === "Escape" || ((e.key === "Enter" || e.key === " ") && !listos)) { saltar(); }
      if (!capa.isConnected) removeEventListener("keydown", k);
    });
  }

  global.MINISTERIOS = MINISTERIOS;
  global.cambiarMinisterio = () => { location.href = location.pathname; };
  portada();
})(window);
