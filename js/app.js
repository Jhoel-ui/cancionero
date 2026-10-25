// Cancionero de un ministerio de alabanza (Renovación o Renuevo, ver ministerio.js): alabanzas, repertorios y partituras.
(function () {
  "use strict";
  const A = window.Acordes;

  /* ---------- Íconos ---------- */
  const P = {
    izq: '<path d="m15 18-6-6 6-6"/>', der: '<path d="m9 18 6-6-6-6"/>', flecha: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    mas: '<path d="M5 12h14"/><path d="M12 5v14"/>', menos: '<path d="M5 12h14"/>',
    buscar: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    arriba: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>', abajo: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    basura: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    lapiz: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    bajar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    mensaje: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>', play: '<polygon points="6 3 20 12 6 21 6 3"/>', pausa: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    copiar: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    nota: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    casa: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
    calendario: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    corazon: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    manos: '<path d="M7 11V7a2 2 0 0 1 4 0v4"/><path d="M11 7V5a2 2 0 0 1 4 0v6"/><path d="M15 9a2 2 0 0 1 4 0v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L3.3 14a2 2 0 0 1 3.4-2L7 13"/>',
    gota: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    estrella: '<path d="M11.5 2.3a.5.5 0 0 1 1 0l2.3 4.7 5.2.8a.5.5 0 0 1 .3.9l-3.8 3.6.9 5.2a.5.5 0 0 1-.7.5L12 15.5 7.3 18a.5.5 0 0 1-.7-.5l.9-5.2-3.8-3.6a.5.5 0 0 1 .3-.9l5.2-.8Z"/>',
    arbol: '<path d="m12 2-6 9h3l-4 6h14l-4-6h3Z"/><path d="M12 17v5"/>',
    luna: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>', lista: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
    entrar: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/>',
    salir: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    varita: '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>', info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    pantalla: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    asa: '<circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/>',
    orden: '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>',
    metronomo: '<path d="M12 11.5 18 4"/><path d="M8.5 3h7l4 18H4.5Z"/><path d="M7 15h10"/>',
    girar: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
    candado: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  };
  const ic = (n) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;

  /* ---------- Logo del ministerio (el emblema dibujado queda de respaldo) ---------- */
  const MIN = window.MINISTERIO || { id: "renovacion", nombre: "Renovación", dueno: "" };
  let nEmblema = 0;
  function emblema(tam, fondo) {
    if (MIN.logo) return `<img class="logo-min" src="${MIN.logo}" width="${tam}" height="${tam}" alt="Logo del Ministerio de Alabanza ${MIN.nombre}">`;
    const n = ++nEmblema;
    return `<svg class="emblema" width="${tam}" height="${tam}" viewBox="0 0 200 200" role="img" aria-label="Emblema del Ministerio de Alabanza Renovación">
      <defs><path id="em-a${n}" d="M 30,100 A 70,70 0 0 1 170,100"/><path id="em-b${n}" d="M 18,100 A 82,82 0 0 0 182,100"/></defs>
      <circle cx="100" cy="100" r="96" fill="${fondo}" stroke="currentColor" stroke-width="4"/>
      <circle cx="100" cy="100" r="89" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="2.6 1.6"/>
      <circle cx="100" cy="100" r="64" fill="none" stroke="currentColor" stroke-width="2"/>
      <text font-size="13.5" font-weight="700" letter-spacing="1.6"><textPath href="#em-a${n}" startOffset="50%" text-anchor="middle">MINISTERIO DE ALABANZA</textPath></text>
      <text font-size="12.5" font-weight="700" letter-spacing="1.6"><textPath href="#em-b${n}" startOffset="50%" text-anchor="middle">ALTO BALLIVIÁN</textPath></text>
      <rect x="92" y="50" width="16" height="84" fill="currentColor"/><rect x="70" y="70" width="60" height="15" fill="currentColor"/>
      <rect x="40" y="103" width="120" height="25" fill="${fondo}"/>
      <text x="100" y="123" font-size="21" font-weight="700" text-anchor="middle" letter-spacing=".5">RENOVACIÓN</text>
    </svg>`;
  }

  /* ---------- Categorías ---------- */
  const CATEGORIAS = [
    { id: "Alabanza", icono: "manos" }, { id: "Adoración", icono: "corazon" }, { id: "Gratitud", icono: "estrella" },
    { id: "Petición", icono: "gota" }, { id: "Especiales", icono: "nota" }, { id: "Navidad", icono: "arbol" }, { id: "Vigilia", icono: "luna" },
  ];

  /* ---------- Estado ---------- */
  const S = {
    vista: "inicio",       // inicio | cancionero | repertorio | rep-editar | elegir | cancion | editar
    canciones: {}, repertorios: {},
    publicas: {}, privadas: {}, // "canciones" (las ve cualquiera) y "canciones_equipo" (solo el equipo)
    rep: null, prefill: null, ordenando: false, arrastrando: false, catElegir: "",
    categoria: "", orden: "az", buscar: "",
    cancionId: null, contexto: "cancionero", volverA: "cancionero",
    transponer: 0, modo: "practica",
    compartir: false, borrando: false, editorPestana: "escribir",
    fuente: null, cargado: false, sinConexion: false,
    partituras: {}, acceso: {}, llave: "", // partituras privadas por instrumento y quién puede ver cada una
    visorFijo: false,
  };
  const app = document.getElementById("app");

  const pref = {
    leer(k, d) { try { const v = localStorage.getItem("cr-" + k); return v === null ? d : JSON.parse(v); } catch (_) { return d; } },
    guardar(k, v) { try { localStorage.setItem("cr-" + k, JSON.stringify(v)); } catch (_) {} },
  };
  let tamLetra = pref.leer("letra", 1.25);
  let presAcordes = pref.leer("pres-acordes", true);
  let verComo = pref.leer("ver", "letra"); // letra | saxo | trompeta: qué se ve en cada alabanza
  let zoomPart = pref.leer("zoom-part", 1);
  document.documentElement.style.setProperty("--letra", tamLetra + "rem");

  /* ---------- Utilidades ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const normal = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const deIso = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const mayus = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const nombreDia = (f) => mayus(DIAS[deIso(f).getDay()]);
  const fechaLarga = (f) => { const d = deIso(f); return `${nombreDia(f)} ${d.getDate()} de ${MESES[d.getMonth()]}`; };
  const fechaCorta = (f) => { const d = deIso(f); return `${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)}`; };
  const esFecha = (f) => /^\d{4}-\d{2}-\d{2}$/.test(f || "");
  function proximoSabado() {
    const d = new Date(); d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
    return iso(d);
  }
  const clave = (t) => String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

  /* ---------- Repertorios ----------
     { nombre, fecha, items: [{ titulo, tono, id?, alt? } | { bloque: "2da Parte" }] }
     Una alabanza puede estar solo con su nombre; si luego se registra en el cancionero, se enlaza sola
     por el nombre ("Salmo 91" encuentra "Salmos 91"). Los repertorios viejos (id = fecha, canciones: [ids])
     se leen como una lista simple. */
  const suave = (t) => clave(t).split(" ").map((w) => w.replace(/s$/, "")).join(" ");

  /* ---------- Partituras privadas ---------- */
  // Cada instrumento tiene su colección (partituras_saxo, partituras_trompeta) y su lista acceso/<instrumento>:
  // el saxofonista no ve las de trompeta ni al revés. Solo el dueño sube partituras y cambia las listas.
  const duenoCorreo = String(MIN.dueno || "").toLowerCase();
  const adminCorreo = String(MIN.admin || "").toLowerCase();
  const esDueno = () => !!S.fuente && (S.fuente.modo === "local" || (() => {
    const c = String((S.fuente.cuenta && S.fuente.cuenta.correo) || "").toLowerCase();
    return !!c && (c === duenoCorreo || c === adminCorreo);
  })());
  const INSTRUMENTOS = [{ id: "saxo", boton: "Saxofonista", nombre: "saxofón" }, { id: "trompeta", boton: "Trompetista", nombre: "trompeta" }];
  const instrumentosDe = (p) => (Array.isArray(p.instrumentos) && p.instrumentos.length ? p.instrumentos : ["saxo"]);
  const coleccionPart = (instr) => "partituras_" + instr;
  // Lo que se importa (alabanzas, repertorios, partituras) es de cada ministerio: Renovación usa importar/, los demás importar/<id>/.
  const IMPORTAR = MIN.id === "renovacion" ? "importar/" : "importar/" + MIN.id + "/";
  // Botones de instrumento: cada quien ve solo los que puede leer; el dueño ve todos (aunque aún no tengan partituras).
  const instrumentosVisibles = () => INSTRUMENTOS.filter((i) => esDueno() || Object.values(S.partituras).some((p) => instrumentosDe(p).includes(i.id)));
  const conPartituras = () => instrumentosVisibles().length > 0;
  const viendoPartitura = () => verComo !== "letra" && instrumentosVisibles().some((i) => i.id === verComo);
  // Partituras de esas alabanzas, en ese orden y sin repetir (un popurrí sirve para varias alabanzas).
  // Un popurrí va en la primera de sus alabanzas que no tenga partitura propia.
  function gruposPartitura(titulos, instrumento) {
    const lista = Object.values(S.partituras).filter((p) => !instrumento || instrumentosDe(p).includes(instrumento)), vistos = new Set(), grupos = [];
    const de = (t) => { const k = suave(t); return lista.filter((p) => p.pagina === 1 && (p.canciones || []).some((x) => suave(x) === k)); };
    const poner = (p) => { vistos.add(p.clave);
      grupos.push({ titulo: p.titulo, paginas: lista.filter((q) => q.clave === p.clave).sort((a, b) => a.pagina - b.pagina) }); };
    for (const t of titulos) {
      const ps = de(t), propia = ps.some((p) => p.canciones.length === 1);
      ps.filter((p) => !vistos.has(p.clave) && (!propia || p.canciones.length === 1)).forEach(poner);
    }
    titulos.forEach((t) => de(t).filter((p) => !vistos.has(p.clave)).forEach(poner));
    return grupos;
  }
  const imagenValida = (src) => /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(src || "");
  const hojasHTML = (grupos) => grupos.map((g) => `<section>${grupos.length > 1 ? `<h2>${esc(g.titulo)}</h2>` : ""}
      ${g.paginas.filter((p) => imagenValida(p.imagen)).map((p) => `<img src="${p.imagen}" alt="${esc(g.titulo)}, página ${p.pagina} de ${p.total}" draggable="false">`).join("")}</section>`).join("");
  const zoomHTML = () => `<span class="control"><button class="boton boton--chico boton--icono" data-zoom="-1" aria-label="Alejar">${ic("menos")}</button>
      <b class="zoom-num">${Math.round(zoomPart * 100)}%</b><button class="boton boton--chico boton--icono" data-zoom="1" aria-label="Acercar">${ic("mas")}</button></span>`;
  // Pantalla completa. Desde una alabanza (navegar) trae flechas para pasar a la anterior o la siguiente sin salir.
  function abrirVisor(titulo, grupos, navegar) {
    let v = document.getElementById("visor");
    if (!v) {
      v = document.createElement("div");
      v.className = "visor"; v.id = "visor";
      v.setAttribute("role", "dialog"); v.setAttribute("aria-modal", "true");
      v.addEventListener("click", clicVisor);
      document.body.appendChild(v); document.body.classList.add("sin-scroll");
    }
    v.setAttribute("aria-label", titulo);
    const ids = navegar ? listaContexto() : [], i = ids.indexOf(S.cancionId);
    v.innerHTML = `<header class="visor__cab">
        ${navegar ? `<button class="boton boton--icono" data-visor-mover="-1" ${i <= 0 ? "disabled" : ""} aria-label="Alabanza anterior">${ic("izq")}</button>` : ""}
        <b>${esc(titulo)}</b>
        ${navegar ? `<button class="boton boton--icono" data-visor-mover="1" ${i < 0 || i >= ids.length - 1 ? "disabled" : ""} aria-label="Alabanza siguiente">${ic("der")}</button>` : ""}
        <span class="visor__herr">${zoomHTML()}
          <button class="boton boton--icono" data-visor-girar aria-label="Girar">${ic("girar")}</button>
          <button class="boton boton--icono" data-cerrar-visor aria-label="Cerrar">${ic("x")}</button></span></header>
      <div class="visor__hojas partitura" style="--zoom:${zoomPart}">${grupos.length ? hojasHTML(grupos) : `<p class="visor__vacio">No hay partitura de ${esc(nombreInstr())} para esta alabanza.</p>`}
        ${navegar ? adelantoHTML('data-visor-mover="1"') : ""}</div>`;
    activarPellizco(v.querySelector(".partitura"));
    const foco = v.querySelector("[data-cerrar-visor]"); if (foco && !v.contains(document.activeElement)) foco.focus();
  }
  // Lista de correos de cada instrumento (la lista vieja única, acceso/partituras, se toma como la del saxo).
  const accesoDe = (instr) => ((S.acceso[instr] || (instr === "saxo" && S.acceso.partituras) || {}).permitidos || []);
  const instrRep = () => (viendoPartitura() ? verComo : (instrumentosVisibles()[0] || INSTRUMENTOS[0]).id);
  const nombreInstr = () => (INSTRUMENTOS.find((x) => x.id === verComo) || INSTRUMENTOS[0]).nombre;
  // Adelanto: el comienzo de la partitura que sigue, al final de la actual, para entrar a tiempo sin buscarla.
  function adelantoHTML(accion) {
    const ids = listaContexto(), sig = ids[ids.indexOf(S.cancionId) + 1], c = sig && S.canciones[sig];
    if (!c) return "";
    const g = gruposPartitura([c.titulo], viendoPartitura() ? verComo : instrRep())[0];
    const pag = g && g.paginas.find((x) => imagenValida(x.imagen));
    return `<button class="adelanto" ${accion}><span class="adelanto__cab"><span>Sigue</span><b>${esc(c.titulo)}</b>${ic("der")}</span>
      ${pag ? `<span class="adelanto__hoja"><img src="${pag.imagen}" alt="Comienzo de ${esc(g.titulo)}" draggable="false"></span>` : `<span class="adelanto__sin">Sin partitura de ${esc(nombreInstr())}</span>`}</button>`;
  }
  function abrirVisorCancion() {
    const c = S.canciones[S.cancionId]; if (!c) return;
    abrirVisor(c.titulo, gruposPartitura([c.titulo], viendoPartitura() ? verComo : null), true);
  }
  async function clicVisor(e) {
    const b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-cerrar-visor")) return cerrarVisor();
    if (b.dataset.zoom) return cambiarZoom(+b.dataset.zoom);
    if (b.dataset.visorMover) {
      S.visorFijo = true; mover(+b.dataset.visorMover); S.visorFijo = false; abrirVisorCancion();
      const h = document.querySelector(".visor__hojas"); if (h) h.scrollTo(0, 0);
      return;
    }
    if (b.hasAttribute("data-visor-girar")) {
      const v = document.getElementById("visor");
      // En Android se pone en pantalla completa y se gira de verdad; si el teléfono no deja (iPhone), se gira la hoja.
      try {
        if (!document.fullscreenElement) await v.requestFullscreen();
        await screen.orientation.lock(screen.orientation.type.startsWith("portrait") ? "landscape" : "portrait");
      } catch (_) { v.classList.toggle("visor--girado"); }
    }
  }
  function cerrarVisor() {
    const v = document.getElementById("visor");
    if (!v) return;
    try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (_) {}
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    v.remove(); document.body.classList.remove("sin-scroll");
  }
  // Zoom de la partitura: botones + y −, o pellizcando con dos dedos. Se recuerda en el teléfono.
  function cambiarZoom(paso, valor) {
    zoomPart = Math.min(4, Math.max(1, +(valor !== undefined ? valor : zoomPart + paso * 0.25).toFixed(2)));
    pref.guardar("zoom-part", zoomPart);
    document.querySelectorAll(".partitura").forEach((el) => el.style.setProperty("--zoom", zoomPart));
    document.querySelectorAll(".zoom-num").forEach((el) => { el.textContent = Math.round(zoomPart * 100) + "%"; });
  }
  function activarPellizco(el) {
    if (!el) return;
    let d0 = 0, z0 = 1;
    const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    el.addEventListener("touchstart", (e) => { if (e.touches.length === 2) { d0 = dist(e.touches); z0 = zoomPart; } }, { passive: true });
    el.addEventListener("touchmove", (e) => {
      if (e.touches.length !== 2 || !d0) return;
      e.preventDefault();
      const antes = zoomPart, x = el.scrollLeft + el.clientWidth / 2, y = el.scrollTop + el.clientHeight / 2;
      cambiarZoom(0, z0 * dist(e.touches) / d0);
      const k = zoomPart / antes; // mantiene centrado lo que se estaba mirando
      el.scrollLeft = x * k - el.clientWidth / 2; el.scrollTop = y * k - el.clientHeight / 2;
    }, { passive: false });
    el.addEventListener("touchend", () => { d0 = 0; });
  }
  // Las partituras llegan cifradas en importar/partituras.enc.json; la llave viene solo en el link que recibe el dueño
  // (#partituras=…), que nunca llega a un servidor. Al subirlas quedan en Firestore, protegidas por las reglas.
  const olvidarLlave = () => { S.llave = ""; try { sessionStorage.removeItem("cr-llave-part"); } catch (_) {} };
  async function subirPartituras() {
    const bytes = (s) => { s = s.replace(/-/g, "+").replace(/_/g, "/"); s += "=".repeat((4 - s.length % 4) % 4);
      return Uint8Array.from(atob(s), (ch) => ch.charCodeAt(0)); };
    avisar("Subiendo partituras…");
    try {
      const llave = await crypto.subtle.importKey("raw", bytes(S.llave), "AES-GCM", false, ["decrypt"]);
      const { piezas } = await (await fetch(IMPORTAR + "partituras.enc.json", { cache: "no-cache" })).json();
      let n = 0;
      for (const p of piezas) {
        const plano = await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes(p.iv) }, llave, bytes(p.datos));
        const d = JSON.parse(new TextDecoder().decode(plano));
        if (!imagenValida(d.imagen)) continue;
        const instr = instrumentosDe(d)[0], id = `${d.clave}-${d.pagina}`;
        await S.fuente.guardar(coleccionPart(instr), id, Object.assign(d, { instrumentos: [instr] }));
        // Antes todas iban juntas en "partituras": se borra esa copia para que no quede a la vista de otros.
        try { await S.fuente.borrar("partituras", id); } catch (_) {}
        n++;
      }
      olvidarLlave(); render(); avisar(`Listo: ${n} páginas de partituras subidas.`);
    } catch (e) {
      if (e && e.name === "OperationError") avisar("El link de las partituras no es correcto.", true); else errorGuardar(e);
    }
  }
  function buscarPorTitulo(t) {
    const k = suave(t); if (!k) return null;
    const parecidas = [];
    for (const [id, c] of Object.entries(S.canciones)) {
      const s = suave(c.titulo);
      if (s === k) return id;
      if (s.startsWith(k + " ") || k.startsWith(s + " ")) parecidas.push(id);
    }
    return parecidas.length === 1 ? parecidas[0] : null;
  }
  const esCancion = (it) => it && it.bloque === undefined;
  const enlazada = (it) => (!esCancion(it) ? null : it.id && S.canciones[it.id] ? it.id : buscarPorTitulo(it.titulo));
  const rep = (rid) => (rid ? S.repertorios[rid] : null);
  const tituloItem = (it) => it.titulo || (S.canciones[enlazada(it)] || {}).titulo || "";
  const tonoItem = (it) => it.tono || (enlazada(it) ? tonoActual(S.canciones[enlazada(it)]) : "");
  const cancionesDe = (rid) => ((rep(rid) || {}).items || []).filter(esCancion);
  const idsDe = (rid) => [...new Set(cancionesDe(rid).map(enlazada).filter(Boolean))];
  const cuantas = (n) => (n ? n + (n === 1 ? " alabanza" : " alabanzas") : "sin alabanzas");
  function leerRepertorio(id, x) {
    if (Array.isArray(x.items)) return { id, nombre: x.nombre || "Repertorio", fecha: x.fecha || "", items: x.items, importado: x.importado || 0 };
    const f = esFecha(x.fecha) ? x.fecha : esFecha(id) ? id : "";
    return { id, nombre: f ? nombreDia(f) : "Repertorio", fecha: f, items: (x.canciones || []).map((cid) => ({ titulo: "", tono: "", id: cid })) };
  }
  function repertoriosOrdenados() {
    const hoy = iso(new Date()), l = Object.values(S.repertorios);
    return {
      proximos: l.filter((r) => !r.fecha || r.fecha >= hoy).sort((a, b) => (a.fecha || "9").localeCompare(b.fecha || "9")),
      pasados: l.filter((r) => r.fecha && r.fecha < hoy).sort((a, b) => b.fecha.localeCompare(a.fecha)),
    };
  }
  // Lista escrita como en WhatsApp: "- Santo por siempre - G", "----- *2da Parte*", "Ó" para una alternativa.
  function leerLista(texto) {
    let nombre = "", alt = false;
    const items = [];
    for (const crudo of String(texto || "").replace(/\r/g, "").split("\n")) {
      const l = crudo.trim(); if (!l) continue;
      const sep = /^[-–—_=─]{3,}\s*(.*)$/.exec(l);
      if (sep) {
        const t = sep[1].replace(/[*_~]/g, "").trim(), ult = items[items.length - 1];
        alt = false;
        if (ult && !esCancion(ult) && !ult.bloque) items.pop();
        if (items.length || t) items.push({ bloque: t });
        continue;
      }
      if (/^[óo]$/i.test(l)) { alt = true; continue; }
      const marcada = /^(?:[-•*·]|\d+[.)])\s*/.test(l);
      let t = l.replace(/^(?:[-•*·]|\d+[.)])\s*/, "").replace(/[*_~]/g, "").trim();
      if (!marcada && !items.length && !nombre) { nombre = t; continue; }
      let tono = "";
      const m = /^(.*?)\s*[-–—]\s*([^-–—]*)$/.exec(t);
      if (m) {
        const ac = m[2].trim() ? A.normalizarAcorde(m[2].trim().replace(/\s+/g, "")) : "";
        if (ac !== null) { t = m[1].trim(); tono = ac || ""; }
      }
      if (!t) continue;
      const it = { titulo: t, tono }, id = buscarPorTitulo(t);
      if (id) it.id = id;
      if (alt) it.alt = true;
      alt = false; items.push(it);
    }
    while (items.length && !esCancion(items[items.length - 1])) items.pop();
    nombre = nombre.replace(/^repertorio\s+/i, "");
    if (nombre === nombre.toUpperCase()) nombre = nombre.toLowerCase();
    return { nombre: nombre.replace(/^./, (c) => c.toUpperCase()), items };
  }
  function escribirLista(items) {
    return items.map((it) => esCancion(it)
      ? (it.alt ? "Ó\n" : "") + `- ${tituloItem(it)}${tonoItem(it) ? " - " + tonoItem(it) : ""}`
      : "----------" + (it.bloque ? ` *${it.bloque}*` : "")).join("\n");
  }
  // Medios tonos para llevar la alabanza al tono que se puso en el repertorio
  function pasosPara(id, rid) {
    const r = rep(rid); if (!r || !S.canciones[id]) return fijoDe(S.canciones[id]);
    const it = r.items.find((x) => x.tono && enlazada(x) === id);
    return it ? A.pasosEntre(A.tonoDe(S.canciones[id]), it.tono) : fijoDe(S.canciones[id]);
  }
  const puede = (p) => S.cargado && S.fuente && S.fuente.permisos && S.fuente.permisos[p];
  const coincide = (c, q) => !q || normal(`${c.titulo} ${c.autor || ""} ${A.tonoDe(c)} ${tonoActual(c)} ${(c.letra || "").replace(/\[[^\]]*\]/g, "")}`).includes(q);
  const todas = () => Object.entries(S.canciones).map(([id, c]) => ({ id, ...c }));
  function filtradas() {
    const q = normal(S.buscar);
    const l = todas().filter((c) => (!S.categoria || c.categoria === S.categoria) && coincide(c, q));
    return S.orden === "recientes"
      ? l.sort((a, b) => (b.actualizado || 0) - (a.actualizado || 0))
      : l.sort((a, b) => normal(a.titulo).localeCompare(normal(b.titulo)));
  }
  const detalle = (c) => [c.privada && "Solo equipo", c.categoria, c.autor].filter(Boolean).join(" · ");
  // Tono fijado: el líder decide tocarla en otro tono desde ahora (p. ej. G → Ab). La letra se guarda como
  // se escribió y "fijo" dice cuántos medios tonos subirla o bajarla en todas partes.
  const fijoDe = (c) => (c && Number.isInteger(c.fijo) ? c.fijo : 0);
  const tonoActual = (c) => A.tonoTranspuesto(c, fijoDe(c));
  const enFijo = (c) => ((S.transponer - fijoDe(c)) % 12 + 12) % 12 === 0;
  // Las alabanzas "solo equipo" (de otros artistas) viven en otra colección que solo leen los miembros.
  const coleccionDe = (privada) => (privada ? "canciones_equipo" : "canciones");
  function unirCanciones() {
    const priv = {};
    for (const [id, c] of Object.entries(S.privadas)) priv[id] = { ...c, privada: true };
    S.canciones = { ...S.publicas, ...priv };
  }
  async function guardarCancion(id, datos, privada) {
    const { privada: _p, ...limpio } = datos;
    if (privada) limpio.privada = true;
    const antes = id && S.canciones[id];
    const nuevoId = await S.fuente.guardar(coleccionDe(privada), id, limpio);
    // Si cambió de pública a solo equipo (o al revés), se borra de la colección anterior.
    if (antes && !!antes.privada !== !!privada) await S.fuente.borrar(coleccionDe(antes.privada), id);
    (privada ? S.privadas : S.publicas)[nuevoId] = limpio;
    if (antes && !!antes.privada !== !!privada) delete (antes.privada ? S.privadas : S.publicas)[id];
    unirCanciones();
    return nuevoId;
  }

  /* ---------- Avisos ---------- */
  let toastT;
  function avisar(msg, error) {
    document.querySelectorAll(".toast").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast" + (error ? " error" : ""); t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t);
    clearTimeout(toastT);
    toastT = setTimeout(() => { t.style.opacity = "0"; setTimeout(() => t.remove(), 220); }, 3200);
  }
  function errorGuardar(e) {
    const code = e && e.code;
    if (code === "invalid_argument" || code === "permission-denied") avisar("No tienes permiso para este cambio. Pide acceso al líder del ministerio.", true);
    else if (code === "quota_exceeded") avisar("El cancionero está lleno. Borra alabanzas que no uses.", true);
    else avisar("No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.", true);
  }
  // Firestore no acepta campos undefined: se guarda cada elemento limpio.
  const limpio = (it) => esCancion(it)
    ? Object.assign({ titulo: tituloItem(it), tono: it.tono || "" }, it.id ? { id: it.id } : {}, it.alt ? { alt: true } : {})
    : { bloque: it.bloque || "" };
  async function guardarRepertorio(rid, datos) {
    const r = Object.assign({}, rep(rid) || {}, datos);
    const doc = { nombre: r.nombre || "Repertorio", fecha: r.fecha || "", items: (r.items || []).map(limpio), importado: r.importado || 0, actualizado: Date.now() };
    const id = await S.fuente.guardar("repertorios", rid || null, doc);
    S.repertorios[id] = leerRepertorio(id, doc);
    return id;
  }
  async function cambiarItems(items) {
    const rid = S.rep; S.repertorios[rid] = Object.assign({}, rep(rid), { items }); render();
    try { await guardarRepertorio(rid, { items }); } catch (e) { errorGuardar(e); }
  }

  /* ---------- Letra con acordes ---------- */
  function letraHTML(letra, pasos, tonoFinal) {
    const bem = A.usaBemoles(tonoFinal);
    return (letra || "").replace(/\r/g, "").split("\n").map((l) => {
      if (A.esSeccion(l)) return `<div class="parte">${esc(A.nombreSeccion(l))}</div>`;
      const segs = A.segmentos(l);
      if (!segs.some((s) => s.acorde)) return `<div class="ln">${esc(l) || "&nbsp;"}</div>`;
      // Cada acorde va sobre el inicio de su fragmento; la palabra donde cae el acorde no se parte al
      // cambiar de renglón (en el celular "cas-tillo" quedaba separado en dos líneas).
      let html = "", grupo = "";
      const cerrar = () => { if (grupo) html += `<span class="pal">${grupo}</span>`; grupo = ""; };
      const texto = (t) => {
        const k = t.search(/\s\S*$/);
        if (k < 0) { grupo += esc(t); return; }
        const corte = k + 1;
        grupo += esc(t.slice(0, t.search(/\s/))); cerrar();
        html += esc(t.slice(t.search(/\s/), corte)); grupo = esc(t.slice(corte));
      };
      for (const s of segs) {
        if (!s.acorde) { texto(s.texto); continue; }
        const ac = A.transponerAcorde(s.acorde, pasos, bem);
        const primero = /^\S*/.exec(s.texto)[0];
        // El fragmento mide al menos lo que su acorde, así dos acordes seguidos no se montan.
        const corto = s.texto.length <= ac.length + 1;
        grupo += `<span class="seg"${corto ? ` style="--ac:${ac.length}"` : ""}><b class="ch">${esc(ac)}</b>${esc(primero) || "&#8203;"}</span>`;
        const resto = s.texto.slice(primero.length);
        if (resto) texto(resto);
      }
      cerrar();
      return `<div class="ln con-acordes">${html}</div>`;
    }).join("");
  }

  /* ---------- Vistas ---------- */
  function avisos() {
    let h = "";
    if (S.sinConexion) h += `<p class="aviso">${ic("info")}<span><b>No se pudo abrir el cancionero.</b> Revisa tu conexión y vuelve a cargar la página.</span></p>`;
    if (S.fuente && S.fuente.modo === "local") h += `<p class="aviso">${ic("info")}<span><b>Modo de prueba:</b> lo que guardes queda solo en este dispositivo.</span></p>`;
    if (S.fuente && S.fuente.modo === "firebase" && S.fuente.cuenta && !S.fuente.permisos.editar) h += `<p class="aviso">${ic("info")}<span><b>${esc(S.fuente.cuenta.correo)}</b> todavía no está en la lista del equipo. Pide al líder que te agregue para poder editar.</span></p>`;
    if (S.llave) h += esDueno()
      ? `<div class="aviso">${ic("candado")}<span><b>Partituras de saxofón y trompeta listas para subir.</b> Cada una solo la ven tú y quienes pongas en su lista en Equipo.</span>
          <button class="boton boton--chico boton--principal" data-accion="subir-partituras">Subir partituras</button></div>`
      : `<p class="aviso">${ic("candado")}<span><b>Para subir las partituras</b>, inicia sesión con tu cuenta (${esc(duenoCorreo || "la del dueño")}).</span></p>`;
    return h;
  }

  function bloqueRep(r) {
    const l = r ? cancionesDe(r.id) : [];
    return `<article class="bloque">
      <div class="bloque__cab"><span class="bloque__icono">${ic("calendario")}</span>
        <div><h2>${r ? esc(r.nombre) : "Repertorios"}</h2><p class="bloque__sub">${r ? `${r.fecha ? fechaCorta(r.fecha) + " · " : ""}${cuantas(l.length)}` : "Vigilias, ensayos y cultos"}</p></div></div>
      ${!S.cargado ? `<div class="esqueleto"></div>` : l.length
        ? `<ol>${l.slice(0, 6).map((it, i) => { const id = enlazada(it);
            return `<li><button ${id ? `data-abrir="${id}" data-contexto="${r.id}"` : `data-rep="${r.id}"`}><b>${i + 1}</b><span>${esc(tituloItem(it))}</span><em>${esc(tonoItem(it))}</em></button></li>`; }).join("")}</ol>
           ${l.length > 6 ? `<p class="bloque__vacio">y ${l.length - 6} más</p>` : ""}`
        : `<p class="bloque__vacio">${r ? "Todavía sin alabanzas." : puede("editar") ? "Arma el primero: pega la lista tal como la mandas por WhatsApp." : "Cuando se arme un repertorio, aparecerá aquí."}</p>`}
      <button class="boton boton--chico" ${r ? `data-rep="${r.id}"` : `data-nav="repertorio"`}>${r ? "Ver repertorio" : "Ir a repertorios"} ${ic("flecha")}</button>
    </article>`;
  }

  function vistaInicio() {
    const prox = repertoriosOrdenados().proximos.slice(0, 2);
    const total = todas().length;
    const cats = CATEGORIAS.map((c) => ({ ...c, n: todas().filter((x) => x.categoria === c.id).length })).filter((c) => c.n);
    return `<section class="portada">
      <div class="portada__foto ${window.FOTO_PORTADA ? "" : "portada__foto--sin"}" ${window.FOTO_PORTADA ? `style="background-image:url('${window.FOTO_PORTADA}')"` : ""}></div>
      <div class="envoltura">
        <h1>Un mismo corazón, una sola adoración.</h1>
        <blockquote class="portada__versiculo">«Todo lo que respira alabe a JAH. Aleluya.»<cite>Salmo 150:6</cite></blockquote>
        <form class="buscador-grande" id="buscar-portada" role="search">
          <input id="q-portada" type="search" enterkeyhint="search" autocomplete="off" placeholder="Buscar alabanzas, autores o tonos" aria-label="Buscar alabanzas">
          <button type="submit" aria-label="Buscar">${ic("buscar")}</button>
        </form>
        <div class="fila"><a class="boton boton--principal" href="#cancionero" data-nav="cancionero">${ic("nota")} Ir al cancionero</a>
          <a class="boton" href="#repertorio" data-nav="repertorio">${ic("calendario")} Repertorios</a></div>
      </div>
    </section>
    <div class="envoltura" style="padding-bottom:56px;display:grid;gap:28px">
      <div class="inicio-bloques">
        ${prox.length ? prox.map(bloqueRep).join("") : bloqueRep(null)}
        <article class="bloque">
          <div class="bloque__cab"><span class="bloque__icono">${ic("nota")}</span>
            <div><h2>Cancionero</h2><p class="bloque__sub">Letras con acordes y su versión de referencia</p></div></div>
          <div class="cifras"><div><b>${S.cargado ? total : "–"}</b><span>alabanzas</span></div><div><b>${S.cargado ? cats.length : "–"}</b><span>categorías</span></div></div>
          ${cats.length ? `<div class="chips">${cats.map((c) => `<button class="chip" data-cat="${esc(c.id)}">${esc(c.id)} · ${c.n}</button>`).join("")}</div>` : ""}
          <a class="boton boton--chico" href="#cancionero" data-nav="cancionero">Explorar ${ic("flecha")}</a>
        </article>
      </div>
      ${avisos()}
    </div>`;
  }

  function filaCancion(c, contexto) {
    const t = tonoActual(c);
    return `<li><button class="fila-cancion" data-abrir="${c.id}" data-contexto="${contexto}">
      <span class="fila-cancion__icono">${ic((CATEGORIAS.find((x) => x.id === c.categoria) || {}).icono || "nota")}</span>
      <span class="fila-cancion__texto"><b>${esc(c.titulo)}</b><span>${esc(detalle(c)) || "Sin categoría"}</span></span>
      <span class="fila-cancion__tono">${esc(t)}${ic("der")}</span></button></li>`;
  }

  /* ---------- Importar alabanzas (líderes) ----------
     importar/canciones.json trae alabanzas transcritas para cargarlas de una vez con la cuenta del líder.
     Solo se agregan las que todavía no existen (se compara por nombre). Una entrada con "reemplaza" (una marca de
     versión) cambia la alabanza que ya existe con ese nombre, una sola vez: guarda la marca para no volver a pisarla. */
  let paraImportar = null;
  function pendientesImportar() {
    if (!puede("borrar")) return [];
    if (paraImportar === null) {
      paraImportar = [];
      fetch(IMPORTAR + "canciones.json", { cache: "no-store" }).then((r) => (r.ok ? r.json() : [])).then((l) => {
        paraImportar = Array.isArray(l) ? l.filter((c) => c && c.titulo && c.letra) : []; render();
      }).catch(() => {});
    }
    const hay = new Map(todas().map((c) => [clave(c.titulo), c]));
    return paraImportar.filter((c) => { const ya = hay.get(clave(c.titulo)); return !ya || (c.reemplaza && ya.reemplazo !== c.reemplaza); });
  }
  async function importarPendientes() {
    const lista = pendientesImportar();
    const existente = (c) => todas().find((x) => clave(x.titulo) === clave(c.titulo));
    if (!lista.length || !confirm(`¿Agregar ${lista.length} alabanzas al cancionero?\n\n${lista.map((c) => (existente(c) ? "• Reemplazar: " : "• ") + c.titulo).join("\n")}`)) return;
    let n = 0;
    for (const c of lista) {
      const datos = { titulo: c.titulo, autor: c.autor || "", tono: c.tono || "", bpm: c.bpm || "", categoria: c.categoria || "", link: c.link || "", letra: c.letra, actualizado: Date.now() };
      if (c.reemplaza) datos.reemplazo = c.reemplaza;
      const ya = existente(c);
      try { await guardarCancion(ya ? ya.id : null, datos, !!c.privada); n++; } catch (err) { errorGuardar(err); break; }
    }
    render(); if (n) avisar(`${n} alabanzas agregadas.`);
  }

  // Links de referencia: si una alabanza ya cargada no tiene link y el archivo sí lo trae, se le pone.
  function linksPendientes() {
    pendientesImportar();
    const porClave = new Map((paraImportar || []).filter((c) => c.link).map((c) => [clave(c.titulo), c.link]));
    return todas().filter((c) => !c.link && porClave.has(clave(c.titulo))).map((c) => ({ c, link: porClave.get(clave(c.titulo)) }));
  }
  async function ponerLinks() {
    const lista = linksPendientes();
    if (!lista.length || !confirm(`¿Poner el link de la versión a ${lista.length} alabanzas?\n\n${lista.map((x) => "• " + x.c.titulo).join("\n")}`)) return;
    let n = 0;
    for (const { c, link } of lista) {
      const { id, privada, ...datos } = c;
      try { await guardarCancion(id, { ...datos, link, actualizado: Date.now() }, !!privada); n++; } catch (err) { errorGuardar(err); break; }
    }
    render(); if (n) avisar(`Links puestos en ${n} alabanzas.`);
  }

  /* importar/repertorios.json: [{ nombre, fecha, lista }] con la lista escrita como en WhatsApp.
     Se agrega si no hay otro con el mismo nombre y fecha; si en esa fecha hay uno vacío, se llena ese.
     Con "version" mayor a la importada, el mismo repertorio se vuelve a cargar con la lista corregida. */
  let repsImportar = null;
  function repsPendientes() {
    if (!puede("borrar")) return [];
    if (repsImportar === null) {
      repsImportar = [];
      fetch(IMPORTAR + "repertorios.json", { cache: "no-store" }).then((r) => (r.ok ? r.json() : [])).then((l) => {
        repsImportar = Array.isArray(l) ? l.filter((r) => r && r.nombre && r.lista) : []; render();
      }).catch(() => {});
    }
    return repsImportar.filter((n) => { const r = mismoRep(n); return !r || r.fecha !== (n.fecha || "") || (r.importado || 0) < (n.version || 0); });
  }
  // "antes": la fecha que tenía, para mover el mismo repertorio a otra fecha sin duplicarlo.
  const mismoRep = (n) => Object.values(S.repertorios).find((r) => clave(r.nombre) === clave(n.nombre) && [n.fecha || "", n.antes].includes(r.fecha));
  async function importarRepertorios() {
    const lista = repsPendientes();
    if (!lista.length || !confirm(`¿Agregar ${lista.map((r) => "“" + r.nombre + "”").join(", ")} a los repertorios?`)) return;
    for (const n of lista) {
      const destino = mismoRep(n) || Object.values(S.repertorios).find((r) => r.fecha === (n.fecha || "") && !(r.items || []).length);
      try { await guardarRepertorio(destino ? destino.id : null, { nombre: n.nombre, fecha: n.fecha || "", items: leerLista(n.lista).items, importado: n.version || 0 }); }
      catch (err) { errorGuardar(err); break; }
    }
    render(); avisar("Repertorio agregado.");
  }

  function vistaCancionero() {
    const lista = filtradas(), total = todas().length;
    const cuenta = (id) => todas().filter((c) => c.categoria === id).length;
    return `<div class="envoltura pagina">
      ${avisos()}
      <div class="fila fila--entre">
        <div class="seccion-titulo"><h1>Cancionero</h1><p>Busca, practica y adora.</p></div>
        <div class="fila">${(() => { const n = pendientesImportar().length; return n ? `<button class="boton" data-accion="importar">${ic("bajar")} Importar ${n} ${n === 1 ? "alabanza" : "alabanzas"}</button>` : ""; })()}
        ${(() => { const n = puede("borrar") ? linksPendientes().length : 0; return n ? `<button class="boton" data-accion="poner-links">${ic("play")} Poner ${n} ${n === 1 ? "link" : "links"}</button>` : ""; })()}
        ${puede("editar") ? `<button class="boton boton--principal" data-accion="nueva">${ic("mas")} Nueva alabanza</button>` : ""}</div>
      </div>
      <label class="buscador">${ic("buscar")}<input class="campo" id="buscar-lista" type="search" enterkeyhint="search" autocomplete="off" placeholder="Buscar canción, autor, tono o una frase" value="${esc(S.buscar)}" aria-label="Buscar canción"></label>
      <div class="cancionero">
        <nav class="categorias" aria-label="Categorías">
          <button class="categoria" data-cat="" aria-pressed="${!S.categoria}">${ic("nota")}<span>Todas las canciones</span><small>${total}</small></button>
          ${CATEGORIAS.map((c) => `<button class="categoria" data-cat="${c.id}" aria-pressed="${S.categoria === c.id}">${ic(c.icono)}<span>${c.id}</span><small>${cuenta(c.id)}</small></button>`).join("")}
        </nav>
        <div style="display:grid;gap:14px;min-width:0">
          <div class="herr-lista"><span class="ayuda">${S.cargado ? `${lista.length} ${lista.length === 1 ? "alabanza" : "alabanzas"}${S.categoria ? " en " + S.categoria : ""}` : "Cargando…"}</span>
            <label>Ordenar por <select class="campo" id="orden"><option value="az" ${S.orden === "az" ? "selected" : ""}>Nombre (A–Z)</option><option value="recientes" ${S.orden === "recientes" ? "selected" : ""}>Más recientes</option></select></label></div>
          ${!S.cargado ? `<div class="esqueleto"></div><div class="esqueleto"></div><div class="esqueleto"></div>`
            : !total ? `<div class="vacio"><b>El cancionero está vacío</b><p>Registra la primera alabanza: pega la letra con sus acordes y el link de la versión que siguen.</p>
                ${puede("editar") ? `<button class="boton boton--principal" data-accion="nueva">${ic("mas")} Registrar alabanza</button>` : ""}</div>`
            : !lista.length ? `<div class="vacio"><b>Ninguna alabanza coincide</b><button class="boton" data-accion="limpiar">Ver todas</button></div>`
            : `<ul class="canciones">${lista.map((c) => filaCancion(c, "cancionero")).join("")}</ul>`}
        </div>
      </div>
    </div>`;
  }

  function tarjetaRep(r) {
    const n = cancionesDe(r.id).length;
    return `<li><button class="rep-tarjeta" data-rep="${r.id}">
      <span class="rep-tarjeta__fecha">${r.fecha ? `<b>${deIso(r.fecha).getDate()}</b><span>${MESES[deIso(r.fecha).getMonth()].slice(0, 3)}</span>` : ic("calendario")}</span>
      <span class="fila-cancion__texto"><b>${esc(r.nombre)}</b><span>${r.fecha ? nombreDia(r.fecha) + " · " : ""}${cuantas(n)}</span></span>${ic("der")}</button></li>`;
  }
  function vistaRepertorios() {
    const { proximos, pasados } = repertoriosOrdenados(), editable = puede("editar");
    let h = `<div class="envoltura pagina">${avisos()}
      <div class="fila fila--entre"><div class="seccion-titulo"><h1>Repertorios</h1><p>Vigilias, ensayos y cultos, con su orden y sus tonos.</p></div>
        <div class="fila">${(() => { const l = S.cargado ? repsPendientes() : []; return l.length ? `<button class="boton" data-accion="importar-reps">${ic("bajar")} Importar ${l.length === 1 ? esc(l[0].nombre) : l.length + " repertorios"}</button>` : ""; })()}
        ${editable ? `<button class="boton boton--principal" data-accion="rep-nuevo">${ic("mas")} Nuevo repertorio</button>` : ""}</div></div>`;
    if (!S.cargado) return h + `<div class="esqueleto"></div><div class="esqueleto"></div></div>`;
    if (!proximos.length && !pasados.length) {
      return h + `<div class="vacio"><b>Todavía no hay repertorios</b>
        <p>${editable ? "Ponle nombre y fecha, y pega la lista tal como la mandas por WhatsApp." : "Cuando el líder arme un repertorio, aparecerá aquí."}</p>
        ${editable ? `<button class="boton boton--principal" data-accion="rep-nuevo">${ic("mas")} Armar repertorio</button>` : ""}</div></div>`;
    }
    if (proximos.length) h += `<section class="grupo-reps"><h2 class="subtitulo">Próximos</h2><ul class="reps">${proximos.map(tarjetaRep).join("")}</ul></section>`;
    if (pasados.length) h += `<section class="grupo-reps"><h2 class="subtitulo">Anteriores</h2><ul class="reps reps--pasados">${pasados.map(tarjetaRep).join("")}</ul></section>`;
    return h + `</div>`;
  }

  function vistaRepertorio() {
    const r = rep(S.rep);
    if (!r) return vistaRepertorios();
    const editable = puede("editar"), items = r.items || [], primera = idsDe(r.id)[0];
    const total = cancionesDe(r.id).length;
    let n = 0;
    const ord = editable && S.ordenando;
    const filas = ord ? items.map((it, i) => {
      // Modo ordenar: se arrastra desde ≡; se cambia el tono del día o se quita.
      const quitar = `<button class="boton boton--plano boton--chico boton--icono" data-quitar="${i}" aria-label="Quitar">${ic("x")}</button>`;
      if (!esCancion(it)) return `<li class="rep-bloque rep-ord" data-i="${i}"><span class="asa" aria-label="Arrastrar">${ic("asa")}</span>
          <button class="rep-bloque__linea" data-renombrar="${i}">${it.bloque ? `<b>${esc(it.bloque)}</b>` : `<b class="tenue">Separador · ponle nombre</b>`}</button>${quitar}</li>`;
      const t = tonoItem(it);
      return `<li class="rep-ord${it.alt ? " rep-alt" : ""}" data-i="${i}"><span class="asa" aria-label="Arrastrar">${ic("asa")}</span>
          <span class="cancion"><b>${it.alt ? "ó " : ""}${esc(tituloItem(it))}</b></span>
          <button class="tono-chip" data-tono="${i}" aria-label="Tono para este día">${esc(t) || "Tono"}</button>${quitar}</li>`;
    }).join("") : items.map((it, i) => {
      if (!esCancion(it)) return `<li class="rep-bloque"><span class="rep-bloque__linea">${it.bloque ? `<b>${esc(it.bloque)}</b>` : ""}</span></li>`;
      const id = enlazada(it), c = id && S.canciones[id], t = tonoItem(it);
      if (!it.alt) n++;
      const sub = [t && "Tono " + t, !c || !c.letra ? "Sin letra" : ""].filter(Boolean).join(" · ");
      return `<li class="${it.alt ? "rep-alt" : ""}${c ? "" : " rep-sin"}"><span class="orden">${it.alt ? "ó" : n}</span>
          ${c ? `<button class="cancion" data-abrir="${id}" data-contexto="${r.id}"><b>${esc(tituloItem(it))}</b><span>${esc(sub) || "&nbsp;"}</span></button>`
              : editable ? `<button class="cancion" data-registrar="${i}"><b>${esc(tituloItem(it))}</b><span>${esc(sub)}</span></button>`
              : `<span class="cancion"><b>${esc(tituloItem(it))}</b><span>${esc(sub)}</span></span>`}</li>`;
    }).join("");
    const txt = mensajeWhatsApp(r.id), partituras = gruposPartitura(cancionesDe(r.id).map(tituloItem), instrRep());
    return `<div class="envoltura pagina">${avisos()}
      <div class="fila"><button class="boton boton--plano" data-accion="reps">${ic("izq")} Repertorios</button></div>
      <div class="fila fila--entre"><div class="seccion-titulo"><h1>${esc(r.nombre)}</h1><p>${r.fecha ? fechaLarga(r.fecha) + " · " : ""}${cuantas(total)}</p></div>
        ${editable ? (ord
          ? `<div class="fila"><button class="boton" data-accion="separador">${ic("menos")} Separador</button>
              <button class="boton boton--principal" data-accion="ordenar-listo">${ic("check")} Listo</button></div>`
          : `<div class="fila"><button class="boton boton--principal" data-accion="elegir">${ic("mas")} Agregar alabanzas</button>
              ${items.length > 1 ? `<button class="boton" data-accion="ordenar">${ic("orden")} Ordenar</button>` : ""}
              <button class="boton boton--plano" data-accion="rep-editar">${ic("lapiz")} Nombre y fecha</button></div>`) : ""}</div>
      ${items.length ? `<div class="repertorio"><div style="display:grid;gap:14px;min-width:0">
        ${ord ? `<p class="ayuda">Mantén presionado ${ic("asa")} y arrastra para mover. Toca el tono para cambiarlo solo en este repertorio.</p>`
          : editable && cancionesDe(r.id).some((it) => !enlazada(it)) ? `<p class="ayuda">Toca una alabanza “Sin letra” para registrarla en el cancionero; quedará enlazada aquí.</p>` : ""}
        <ol class="lista-rep lista-rep--rep${ord ? " lista-rep--ord" : ""}" id="lista-rep">${filas}</ol>
        <div class="fila">${primera ? `<button class="boton boton--principal" data-abrir="${primera}" data-contexto="${r.id}" data-modo="presentacion">${ic("pantalla")} Presentar en vivo</button>` : ""}
          <button class="boton" data-accion="pdf">${ic("bajar")} Descargar PDF</button>
          ${partituras.length ? `<button class="boton" data-accion="partituras-rep">${ic("nota")} Partituras (${partituras.length})</button>` : ""}</div>
      </div>
      <aside class="panel"><h2>Enviar al grupo de WhatsApp</h2><pre class="mensaje" id="mensaje">${esc(txt)}</pre>
        <div class="fila"><button class="boton boton--principal" data-accion="copiar">${ic("copiar")} Copiar</button>
        <a class="boton" href="https://wa.me/?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">${ic("mensaje")} Abrir WhatsApp</a></div></aside>
      </div>` : `<div class="vacio"><b>Este repertorio está vacío</b>${editable ? `<p>Toca las alabanzas que van; después las ordenas.</p><button class="boton boton--principal" data-accion="elegir">${ic("mas")} Agregar alabanzas</button>` : ""}</div>`}
    </div>`;
  }

  function vistaRepEditar() {
    const r = rep(S.rep) || { nombre: "", fecha: proximoSabado(), items: [] };
    return `<div class="envoltura pagina">
      <div class="fila"><button class="boton boton--plano" data-accion="rep-cancelar">${ic("izq")} Cancelar</button></div>
      <div class="seccion-titulo"><h1>${S.rep ? "Editar repertorio" : "Nuevo repertorio"}</h1></div>
      <form id="form-rep" class="formulario" novalidate>
        <div class="dos">
          <label class="etiqueta">Nombre<input class="campo" name="nombre" list="nombres-rep" autocomplete="off" placeholder="Oficial vigilia" value="${esc(r.nombre)}"></label>
          <label class="etiqueta">Fecha<input class="campo" name="fecha" type="date" required value="${esc(r.fecha)}"></label>
        </div>
        <datalist id="nombres-rep">${["Oficial vigilia", "Ensayo viernes", "Ensayo miércoles", "Confraternidad", "Domingo", "Sábado"].map((x) => `<option value="${x}">`).join("")}</datalist>
        ${S.rep ? "" : `<p class="ayuda">Después de guardar eliges las alabanzas tocándolas.</p>`}
        <details class="pegar"><summary>${S.rep ? "Editar como texto" : "¿Ya tienes la lista escrita en WhatsApp? Pégala aquí"}</summary>
          <label class="etiqueta">Lista<textarea class="campo campo--lista" name="lista" rows="16" spellcheck="false" placeholder="- Santo por siempre - G\n----------\n- Gracia sublime - A\n- Danzando - Bm\n---------- *2da Parte*\n- Jehová Jireh - G">${esc(escribirLista(r.items || []))}</textarea></label>
          <p class="ayuda">Una alabanza por línea con su tono: <b>- Danzando - Bm</b>. Separa las partes con <b>-----</b> y, si quieres, ponle nombre: <b>----- 2da Parte</b>. Escribe <b>Ó</b> en una línea para marcar la siguiente como alternativa.</p>
          <p class="ayuda" id="rep-resumen" aria-live="polite"></p>
        </details>
        <div class="fila"><button class="boton boton--principal" type="submit">${ic("check")} ${S.rep ? "Guardar" : "Crear y elegir alabanzas"}</button>
          ${S.rep && puede("borrar") ? `<button class="boton boton--plano boton--peligro" type="button" data-accion="rep-borrar">${ic("basura")} Borrar repertorio</button>` : ""}</div>
      </form>
    </div>`;
  }
  function resumenLista() {
    const f = document.getElementById("form-rep"), out = document.getElementById("rep-resumen");
    if (!f || !out) return;
    const l = leerLista(f.lista.value).items.filter(esCancion), con = l.filter((it) => it.id).length;
    out.textContent = l.length ? `${cuantas(l.length)}; ${con} ya ${con === 1 ? "tiene" : "tienen"} letra en el cancionero.` : "";
  }

  function vistaElegir() {
    const r = rep(S.rep);
    if (!r) return vistaRepertorios();
    const ids = idsDe(r.id), q = normal(S.buscar);
    const lista = todas().filter((c) => (!S.catElegir || c.categoria === S.catElegir) && coincide(c, q))
      .sort((a, b) => normal(a.titulo).localeCompare(normal(b.titulo)));
    const cats = CATEGORIAS.filter((c) => todas().some((x) => x.categoria === c.id));
    const exacta = S.buscar.trim() && todas().some((c) => clave(c.titulo) === clave(S.buscar));
    return `<div class="envoltura pagina" style="max-width:48rem">
      <div class="seccion-titulo"><h1>Agregar a ${esc(r.nombre)}</h1><p>Toca las alabanzas que van. Se agregan al final; después las ordenas.</p></div>
      <label class="buscador">${ic("buscar")}<input class="campo" id="buscar-elegir" type="search" enterkeyhint="search" autocomplete="off" placeholder="Buscar canción" value="${esc(S.buscar)}" aria-label="Buscar canción"></label>
      ${cats.length ? `<div class="chips chips--desliza"><button class="chip" data-cat-elegir="" aria-pressed="${!S.catElegir}">Todas</button>${cats.map((c) => `<button class="chip" data-cat-elegir="${esc(c.id)}" aria-pressed="${S.catElegir === c.id}">${esc(c.id)}</button>`).join("")}</div>` : ""}
      ${S.buscar.trim() && !exacta ? `<button class="boton" data-agregar-nombre="${esc(S.buscar.trim())}">${ic("mas")} Agregar “${esc(S.buscar.trim())}” sin letra</button>` : ""}
      ${lista.length ? `<ul class="lista-rep lista-elegir">${lista.map((c) => {
        const pos = ids.indexOf(c.id), t = tonoActual(c);
        return `<li><button class="elegir${pos >= 0 ? " elegida" : ""}" ${pos >= 0 ? `data-sacar="${c.id}"` : `data-agregar="${c.id}"`} aria-pressed="${pos >= 0}">
          <span class="orden">${pos >= 0 ? pos + 1 : ""}</span>
          <span class="cancion"><b>${esc(c.titulo)}</b><span>${esc([t && "Tono " + t, c.categoria].filter(Boolean).join(" · ")) || "&nbsp;"}</span></span>
          <span class="marca">${ic(pos >= 0 ? "check" : "mas")}</span></button></li>`;
      }).join("")}</ul>`
      : `<div class="vacio"><b>${todas().length ? "Ninguna alabanza coincide" : "Todavía no hay alabanzas registradas"}</b></div>`}
      <div class="barra-elegir"><span><b>${cuantas(cancionesDe(r.id).length)}</b> en el repertorio</span>
        <button class="boton boton--principal" data-accion="listo">${ic("check")} Listo</button></div>
    </div>`;
  }

  function listaContexto() {
    if (rep(S.contexto)) return idsDe(S.contexto);
    return filtradas().map((c) => c.id);
  }

  function vistaCancion() {
    const c = S.canciones[S.cancionId];
    if (!c) { S.vista = S.volverA; return render(); }
    const tonoFinal = A.tonoTranspuesto(c, S.transponer), ids = listaContexto();
    const enRep = !!rep(S.contexto), part = viendoPartitura();
    const bpm = metro.bpm || +c.bpm || 0;
    return `<div class="envoltura pagina">
      <div class="fila"><button class="boton boton--plano" data-accion="volver">${ic("izq")} ${S.volverA === "repertorio" ? "Repertorio" : S.volverA === "inicio" ? "Inicio" : "Cancionero"}</button></div>
      <div class="vista-cancion">
        <aside class="lateral">
          <p class="lateral__titulo">${enRep ? esc(rep(S.contexto).nombre) : S.categoria || "Todas las canciones"}</p>
          ${enRep ? "" : `<label class="buscador">${ic("buscar")}<input class="campo" id="buscar-lateral" type="search" autocomplete="off" placeholder="Buscar cantos" value="${esc(S.buscar)}" aria-label="Buscar cantos"></label>`}
          <ol>${ids.map((id, i) => `<li><button data-abrir="${id}" data-contexto="${S.contexto}" aria-current="${id === S.cancionId}"><b>${String(i + 1).padStart(2, "0")}</b><span>${esc(S.canciones[id].titulo)}</span></button></li>`).join("")}</ol>
        </aside>
        <div style="display:grid;gap:16px;min-width:0">
          <div class="barra-herr">
            ${conPartituras() ? `<div class="segmentos segmentos--ver" role="group" aria-label="Qué ver">
              <button data-ver="letra" aria-pressed="${!part}">Letra</button>
              ${instrumentosVisibles().map((x) => `<button data-ver="${x.id}" aria-pressed="${part && verComo === x.id}">${x.boton}</button>`).join("")}
            </div>` : ""}
            ${part ? `<div class="fila" style="gap:12px">${zoomHTML()}
              <button class="boton boton--chico" data-accion="partitura">${ic("pantalla")} Pantalla completa</button></div>` : `
            <div class="segmentos" role="group" aria-label="Modo">
              <button data-modo-btn="presentacion" aria-pressed="false">Modo presentación</button>
              <button data-modo-btn="practica" aria-pressed="true">Modo práctica</button>
            </div>
            <div class="fila" style="gap:16px">
              ${tonoFinal ? `<span class="control"><span>Transponer</span>
                <button class="boton boton--chico boton--icono" data-accion="tono-bajar" aria-label="Bajar medio tono">${ic("menos")}</button>
                <button class="boton boton--chico boton--icono" data-accion="tono-subir" aria-label="Subir medio tono">${ic("mas")}</button>
                <b>${esc(tonoFinal)}</b></span>` : ""}
              <span class="control"><span>BPM</span>
                <button class="boton boton--chico boton--icono" data-accion="bpm-menos" aria-label="Menos pulsos">${ic("menos")}</button>
                <b id="bpm">${bpm || "–"}</b>
                <button class="boton boton--chico boton--icono" data-accion="bpm-mas" aria-label="Más pulsos">${ic("mas")}</button>
                <button class="boton boton--chico boton--icono ${metro.activo ? "activo" : ""}" data-accion="metronomo" aria-label="${metro.activo ? "Detener metrónomo" : "Iniciar metrónomo"}">${ic(metro.activo ? "pausa" : "metronomo")}</button></span>
              <span class="control"><span>Letra</span>
                <button class="boton boton--chico boton--icono" data-accion="letra-menos" aria-label="Letra más pequeña">${ic("menos")}</button>
                <button class="boton boton--chico boton--icono" data-accion="letra-mas" aria-label="Letra más grande">${ic("mas")}</button></span>
            </div>`}
          </div>
          ${part ? `<article class="hoja hoja--partitura">
            <header class="hoja__cab"><div><h1>${esc(c.titulo)}</h1><p>Partitura de ${esc(nombreInstr())}</p></div>
              ${c.link ? `<a class="boton boton--chico boton--principal" href="${esc(c.link)}" target="_blank" rel="noopener">${ic("play")} Escuchar versión</a>` : ""}</header>
            ${gruposPartitura([c.titulo], verComo).length
              ? `<div class="partitura" id="partitura" style="--zoom:${zoomPart}">${hojasHTML(gruposPartitura([c.titulo], verComo))}</div>
                 ${adelantoHTML('data-accion="siguiente"')}
                 <p class="ayuda">Acerca con dos dedos o con + y −. Gira el teléfono para verla en horizontal.</p>`
              : `<p class="ayuda">Todavía no hay partitura de ${esc(nombreInstr())} para esta alabanza. <button class="enlace" data-ver="letra">Ver la letra</button></p>`}
          </article>` : `<article class="hoja">
            <header class="hoja__cab"><div><h1>${esc(c.titulo)}</h1>${detalle(c) ? `<p>${esc(detalle(c))}</p>` : ""}</div>
              <div class="fila">${tonoFinal ? `<span class="hoja__tono">Tono: <b>${esc(tonoFinal)}</b></span>` : ""}
                ${!enFijo(c) ? `<button class="boton boton--chico" data-accion="tono-original">Volver a ${esc(tonoActual(c))}</button>` : ""}
                ${puede("editar") && !enFijo(c) ? `<button class="boton boton--chico boton--principal" data-accion="tono-fijar">${ic("check")} Fijar en ${esc(tonoFinal)}</button>` : ""}
                ${fijoDe(c) && enFijo(c) ? `<span class="ayuda">Fijado · original ${esc(A.tonoDe(c))}${puede("editar") ? ` · <button class="enlace" data-accion="tono-quitar-fijo">usar el original</button>` : ""}</span>` : ""}
                ${c.link ? `<a class="boton boton--chico boton--principal" href="${esc(c.link)}" target="_blank" rel="noopener">${ic("play")} Escuchar versión</a>` : ""}</div></header>
            <div class="letra">${letraHTML(c.letra, S.transponer, tonoFinal) || '<p class="ayuda">Esta alabanza todavía no tiene letra.</p>'}</div>
          </article>`}
          ${puede("editar") ? (S.borrando
            ? `<div class="confirmar"><p>¿Borrar “${esc(c.titulo)}” del cancionero? También se quitará de los repertorios. No se puede deshacer.</p>
               <div class="fila"><button class="boton boton--principal" data-accion="borrar-si">${ic("basura")} Sí, borrar</button><button class="boton" data-accion="borrar-no">Cancelar</button></div></div>`
            : `<div class="fila"><button class="boton" data-accion="editar">${ic("lapiz")} Editar</button>
               ${puede("borrar") ? `<button class="boton boton--plano boton--peligro" data-accion="borrar">${ic("basura")} Borrar</button>` : ""}</div>`) : ""}
        </div>
      </div>
    </div>`;
  }

  function pasadorHTML() {
    if (S.vista !== "cancion") return "";
    const ids = listaContexto(), i = ids.indexOf(S.cancionId);
    if (i < 0 || ids.length < 2) return "";
    const sig = ids[i + 1] ? S.canciones[ids[i + 1]] : null;
    return `<nav class="pasador" aria-label="Siguiente alabanza"><div class="envoltura">
      <button class="boton boton--icono" data-accion="anterior" ${i === 0 ? "disabled" : ""} aria-label="Alabanza anterior">${ic("izq")}</button>
      <div class="pasador__centro"><b>${i + 1} de ${ids.length}${rep(S.contexto) ? " · " + esc(rep(S.contexto).nombre) : ""}</b><span>${sig ? "Sigue: " + esc(sig.titulo) : "Última de la lista"}</span></div>
      <button class="boton boton--icono boton--principal" data-accion="siguiente" ${sig ? "" : "disabled"} aria-label="Alabanza siguiente">${ic("der")}</button>
    </div></nav>`;
  }

  function vistaEquipo() {
    const f = S.fuente;
    if (!f || !f.permisos.borrar) return `<div class="envoltura pagina"><p class="vacio">Solo los líderes pueden ver el equipo.</p></div>`;
    const lista = (l) => esc((l || []).join("\n"));
    return `<div class="envoltura pagina">
      <div class="seccion-titulo"><h1>Equipo</h1><p>Quién puede agregar y editar alabanzas. Un correo de Google por línea.</p></div>
      <form id="form-equipo" class="formulario" novalidate>
        <label class="etiqueta">Líderes (pueden borrar)<textarea class="campo" name="lideres" rows="4" autocapitalize="off" spellcheck="false" placeholder="nombre@gmail.com">${lista((f.equipo || {}).lideres)}</textarea></label>
        <label class="etiqueta">Miembros (agregan y editan)<textarea class="campo" name="miembros" rows="8" autocapitalize="off" spellcheck="false" placeholder="nombre@gmail.com">${lista((f.equipo || {}).miembros)}</textarea></label>
        <div class="fila"><button class="boton boton--principal" type="submit">${ic("check")} Guardar equipo</button></div>
      </form>
      ${esDueno() ? `<form id="form-acceso" class="formulario" novalidate>
        <div class="seccion-titulo"><h2>${ic("candado")} Partituras</h2><p>Cada lista ve solo las partituras de su instrumento: el saxofonista no ve las de trompeta ni al revés. Solo tú puedes cambiar estas listas.</p></div>
        ${INSTRUMENTOS.map((x) => `<label class="etiqueta">Pueden ver las de ${x.nombre}<textarea class="campo" name="permitidos-${x.id}" rows="3" autocapitalize="off" spellcheck="false" placeholder="nombre@gmail.com">${lista(accesoDe(x.id))}</textarea></label>`).join("")}
        <div class="fila"><button class="boton boton--principal" type="submit">${ic("check")} Guardar acceso</button></div>
      </form>` : ""}</div>`;
  }
  function vistaEditar() {
    const c = S.cancionId ? S.canciones[S.cancionId] || {} : S.prefill || {};
    const prev = S.editorPestana === "ver";
    return `<div class="envoltura pagina">
      <div class="fila"><button class="boton boton--plano" data-accion="cancelar-edicion">${ic("izq")} Cancelar</button></div>
      <div class="seccion-titulo"><h1>${S.cancionId ? "Editar alabanza" : "Nueva alabanza"}</h1></div>
      <form id="form-cancion" class="formulario" novalidate>
        <label class="etiqueta">Nombre<input class="campo" id="f-titulo" name="titulo" required autocomplete="off" value="${esc(c.titulo)}"></label>
        <div class="tres">
          <label class="etiqueta">Autor o grupo<input class="campo" id="f-autor" name="autor" autocomplete="off" value="${esc(c.autor)}"></label>
          <label class="etiqueta">Tono<input class="campo" id="f-tono" name="tono" autocomplete="off" autocapitalize="characters" placeholder="G" value="${esc(c.tono)}"></label>
          <label class="etiqueta">BPM<input class="campo" id="f-bpm" name="bpm" inputmode="numeric" placeholder="72" value="${esc(c.bpm)}"></label>
        </div>
        ${fijoDe(c) ? `<p class="ayuda">Se toca en <b>${esc(tonoActual(c))}</b> (tono fijado). Aquí van el tono y los acordes originales, en ${esc(A.tonoDe(c))}.</p>` : ""}
        <label class="etiqueta">Categoría<select class="campo" id="f-categoria" name="categoria" style="border-radius:12px;min-height:48px">
          <option value="">Sin categoría</option>${CATEGORIAS.map((x) => `<option ${c.categoria === x.id ? "selected" : ""}>${x.id}</option>`).join("")}</select></label>
        <label class="etiqueta">Link de la versión que seguimos<input class="campo" id="f-link" name="link" type="url" inputmode="url" autocapitalize="none" placeholder="https://youtube.com/…" value="${esc(c.link)}"></label>
        <label class="casilla"><input type="checkbox" name="privada" ${c.privada ? "checked" : ""}><span>${ic("candado")} <b>Solo equipo</b>: no aparece en la página pública, solo la ven los que inician sesión. Úsalo para alabanzas de otros artistas.</span></label>
        <div style="display:grid;gap:10px">
          <div class="fila fila--entre"><span class="etiqueta">Letra con acordes</span>
            <div class="segmentos" role="tablist">
              <button type="button" role="tab" data-pestana="escribir" aria-selected="${!prev}">Escribir</button>
              <button type="button" role="tab" data-pestana="ver" aria-selected="${prev}">Vista previa</button></div></div>
          <textarea class="campo" id="f-letra" name="letra" rows="16" ${prev ? "hidden" : ""} placeholder="Coro:\nBueno [G] es alabarte señor">${esc(c.letra)}</textarea>
          <div class="vista-previa letra" id="vista-previa" ${prev ? "" : "hidden"}></div>
          <p class="ayuda" data-escribir ${prev ? "hidden" : ""}>Escribe el acorde entre corchetes antes de la sílaba: <b>Bueno [G] es alabarte</b>. Si copias de una página con los acordes arriba de la letra, pégalo tal cual y toca <b>Acomodar acordes</b>. Pon “Coro:”, “Verso 1:” o “Puente:” en su propia línea.</p>
          <div class="fila" data-escribir ${prev ? "hidden" : ""}><button class="boton" type="button" data-accion="acomodar">${ic("varita")} Acomodar acordes</button></div>
        </div>
        <div class="fila"><button class="boton boton--principal" type="submit">${ic("check")} Guardar alabanza</button></div>
      </form>
    </div>`;
  }

  /* ---------- Ordenar arrastrando (SortableJS) ---------- */
  function activarArrastre() {
    const el = document.getElementById("lista-rep");
    if (!el || !window.Sortable) return;
    window.Sortable.create(el, {
      handle: ".asa", animation: 160, delay: 0, ghostClass: "arrastrando-fantasma", chosenClass: "arrastrando-elegida",
      onStart: () => { S.arrastrando = true; },
      onEnd: (ev) => {
        S.arrastrando = false;
        const items = ((rep(S.rep) || {}).items || []).slice();
        if (ev.oldIndex === ev.newIndex) return render();
        const [it] = items.splice(ev.oldIndex, 1); items.splice(ev.newIndex, 0, it);
        cambiarItems(items);
      },
    });
  }

  /* ---------- Puerta: el cancionero es solo para el equipo de cada ministerio ---------- */
  // Las reglas de Firestore no le dan nada a quien no está en la lista; aquí solo se explica qué hacer.
  function vistaPuerta() {
    const f = S.fuente;
    if (!f || f.modo !== "firebase" || !f.cuentaLista || f.permisos.editar) return "";
    const logo = MIN.logo ? `<img src="${MIN.logo}" alt="">` : "";
    const cambiar = `<button class="cambiar-ministerio" type="button" data-accion="cambiar-ministerio">Cambiar de ministerio</button>`;
    if (!f.cuenta) return `<section class="acceso-equipo">${logo}<h1>Cancionero de ${esc(MIN.nombre)}</h1>
      <p>Es solo para el equipo del ministerio. Entra con tu cuenta de Google para ver las alabanzas y los repertorios.</p>
      <button class="boton boton--principal" data-accion="entrar">${ic("entrar")} Entrar con Google</button>${cambiar}</section>`;
    const sinLider = !duenoCorreo;
    return `<section class="acceso-equipo">${logo}<h1>Cancionero de ${esc(MIN.nombre)}</h1>
      <p>${sinLider ? `Este espacio todavía se está preparando. Cuando su líder lo active, podrá agregarte.`
        : `<b>${esc(f.cuenta.correo)}</b> no está en el equipo de ${esc(MIN.nombre)}. Pide a su líder que te agregue y vuelve a entrar.`}</p>
      <button class="boton" data-accion="salir">${ic("salir")} Usar otra cuenta</button>${cambiar}</section>`;
  }

  /* ---------- Render ---------- */
  const SECCION = { inicio: "inicio", cancionero: "cancionero", repertorio: "repertorio", "rep-editar": "repertorio", elegir: "repertorio", editar: "cancionero" };
  function render() {
    const sec = S.vista === "cancion" ? S.volverA : SECCION[S.vista];
    document.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.closest("#app")) return;
      a.toggleAttribute("aria-current", a.dataset.nav === sec);
      if (a.dataset.nav === sec) a.setAttribute("aria-current", "page");
    });
    pintarCuenta();
    if (S.vista === "editar" && document.getElementById("form-cancion")) return;
    if (S.vista === "rep-editar" && document.getElementById("form-rep")) return;
    if (S.arrastrando) return;
    if (S.vista === "equipo" && document.getElementById("form-equipo") && document.activeElement && document.activeElement.form) return;
    const foco = document.activeElement && document.activeElement.id;
    const cursor = foco && document.activeElement.selectionStart;
    const puerta = vistaPuerta();
    document.body.classList.toggle("en-puerta", !!puerta);
    if (puerta) { app.innerHTML = puerta; document.getElementById("pasador").innerHTML = ""; return; }
    app.innerHTML = { inicio: vistaInicio, cancionero: vistaCancionero, repertorio: vistaRepertorio, "rep-editar": vistaRepEditar, elegir: vistaElegir, cancion: vistaCancion, editar: vistaEditar, equipo: vistaEquipo }[S.vista]();
    const pas = pasadorHTML();
    document.getElementById("pasador").innerHTML = pas;
    document.body.classList.toggle("con-pasador", !!pas);
    if (S.vista === "editar") actualizarVistaPrevia();
    if (S.vista === "rep-editar") resumenLista();
    if (S.vista === "repertorio" && S.ordenando) activarArrastre();
    activarPellizco(document.getElementById("partitura"));
    if (S.vista === "cancion" && S.modo === "presentacion") pintarPresentacion();
    if (foco) { const el = document.getElementById(foco); if (el && el.tagName === "INPUT") { el.focus(); try { el.setSelectionRange(cursor, cursor); } catch (_) {} } }
  }
  function pintarCuenta() {
    const caja = document.getElementById("cuenta"), f = S.fuente;
    if (!f || f.modo !== "firebase") { caja.innerHTML = ""; return; }
    caja.innerHTML = f.cuenta
      ? (f.permisos.borrar ? `<button class="boton boton--chico" data-accion="equipo" aria-label="Equipo">${ic("manos")}<span class="solo-escritorio">Equipo</span></button>` : "")
        + `<button class="boton boton--chico" data-accion="salir" aria-label="Salir">${ic("salir")}<span class="solo-escritorio">Salir</span></button>`
      : `<button class="boton boton--chico boton--principal" data-accion="entrar">${ic("entrar")} Iniciar sesión</button>`;
  }
  function actualizarVistaPrevia() {
    const f = document.getElementById("form-cancion"), v = document.getElementById("vista-previa");
    if (f && v) v.innerHTML = letraHTML(f.letra.value, 0, f.tono.value) || '<p class="ayuda">Escribe la letra para verla aquí.</p>';
  }
  function irA(vista) {
    if (vista !== "cancion") { cerrarPresentacion(); metro.parar(); }
    if (!S.visorFijo) cerrarVisor();
    S.vista = vista; S.borrando = false; app.innerHTML = ""; render(); window.scrollTo(0, 0);
    const sec = SECCION[vista];
    if (sec && location.hash !== "#" + sec) { try { history.replaceState(null, "", "#" + sec); } catch (_) {} }
  }
  function abrirCancion(id, contexto, modo) {
    if (S.vista !== "cancion") S.volverA = SECCION[S.vista] || "cancionero";
    S.cancionId = id; S.contexto = contexto || "cancionero"; S.transponer = pasosPara(id, S.contexto);
    metro.parar(); metro.bpm = 0;
    if (modo) S.modo = modo;
    irA("cancion");
  }
  function mover(paso) {
    const ids = listaContexto(), i = ids.indexOf(S.cancionId) + paso;
    if (i < 0 || i >= ids.length) return;
    S.cancionId = ids[i]; S.transponer = pasosPara(ids[i], S.contexto); S.borrando = false; metro.parar(); metro.bpm = 0;
    render(); if (S.modo !== "presentacion") window.scrollTo(0, 0);
  }

  /* ---------- Modo presentación ---------- */
  function pintarPresentacion() {
    const c = S.canciones[S.cancionId]; if (!c) return;
    let el = document.getElementById("presentacion");
    if (!el) {
      el = document.createElement("div"); el.id = "presentacion"; el.className = "presentacion";
      el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "Modo presentación");
      document.body.appendChild(el);
      try { if (document.documentElement.requestFullscreen && matchMedia("(pointer: fine)").matches) document.documentElement.requestFullscreen().catch(() => {}); } catch (_) {}
    }
    el.classList.toggle("con-acordes", presAcordes);
    const ids = listaContexto(), i = ids.indexOf(S.cancionId), sig = ids[i + 1] ? S.canciones[ids[i + 1]] : null;
    const tonoFinal = A.tonoTranspuesto(c, S.transponer);
    el.innerHTML = `<div class="presentacion__cab"><h2>${esc(c.titulo)}</h2>
        <div class="fila"><span>${tonoFinal ? "Tono " + esc(tonoFinal) : ""}</span>
        <button class="boton boton--chico" data-pres="acordes">${presAcordes ? "Ocultar acordes" : "Mostrar acordes"}</button>
        <button class="boton boton--chico boton--icono" data-pres="cerrar" aria-label="Salir del modo presentación">${ic("x")}</button></div></div>
      <div class="presentacion__cuerpo"><div class="letra">${letraHTML(c.letra, S.transponer, tonoFinal)}</div></div>
      <div class="presentacion__pie"><button class="boton boton--icono" data-pres="anterior" ${i <= 0 ? "disabled" : ""} aria-label="Anterior">${ic("izq")}</button>
        <span>${i >= 0 ? `${i + 1} de ${ids.length}` : ""}${sig ? " · Sigue: " + esc(sig.titulo) : ""}</span>
        <button class="boton boton--icono boton--principal" data-pres="siguiente" ${sig ? "" : "disabled"} aria-label="Siguiente">${ic("der")}</button></div>`;
    el.querySelector(".presentacion__cuerpo").scrollTop = 0;
  }
  function cerrarPresentacion() {
    const el = document.getElementById("presentacion");
    if (el) el.remove();
    S.modo = "practica";
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch (_) {}
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-pres]"); if (!b) return;
    const a = b.dataset.pres;
    if (a === "cerrar") { cerrarPresentacion(); render(); }
    else if (a === "acordes") { presAcordes = !presAcordes; pref.guardar("pres-acordes", presAcordes); pintarPresentacion(); }
    else mover(a === "siguiente" ? 1 : -1);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.getElementById("visor")) return cerrarVisor();
    if (!document.getElementById("presentacion")) return;
    if (e.key === "Escape") { cerrarPresentacion(); render(); }
    if (e.key === "ArrowRight" || e.key === "PageDown") mover(1);
    if (e.key === "ArrowLeft" || e.key === "PageUp") mover(-1);
  });

  /* ---------- Metrónomo ---------- */
  const metro = {
    bpm: 0, activo: false, ctx: null, t: null, pulso: 0,
    iniciar(bpm) {
      try { this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { return avisar("Este navegador no permite sonido.", true); }
      this.ctx.resume && this.ctx.resume();
      this.bpm = bpm; this.activo = true; this.pulso = 0;
      const tic = () => {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain(), ahora = this.ctx.currentTime;
        o.frequency.value = this.pulso % 4 === 0 ? 1500 : 1000;
        g.gain.setValueAtTime(0.0001, ahora); g.gain.exponentialRampToValueAtTime(0.5, ahora + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, ahora + 0.06);
        o.connect(g).connect(this.ctx.destination); o.start(ahora); o.stop(ahora + 0.07);
        this.pulso++;
      };
      clearInterval(this.t); tic(); this.t = setInterval(tic, 60000 / this.bpm);
    },
    parar() { clearInterval(this.t); this.activo = false; },
  };

  /* ---------- WhatsApp y PDF ---------- */
  // El mismo formato con el que el ministerio manda la lista: guiones, separadores y tonos.
  function mensajeWhatsApp(rid) {
    const r = rep(rid);
    return `*${r.nombre.toUpperCase()}*\n` + (r.fecha ? `_${fechaLarga(r.fecha)}_\n` : "") + `\n${escribirLista(r.items || [])}`;
  }
  async function descargarPDF(rid) {
    const r = rep(rid), fecha = r.fecha ? fechaLarga(r.fecha) : "";
    if (!window.jspdf) return avisar("No se pudo preparar el PDF. Revisa tu conexión y vuelve a cargar la página.", true);
    const doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), M = 48;
    let y = M;
    const pagina = () => { doc.addPage(); y = M; };
    const espacio = (alto) => { if (y + alto > H - M) pagina(); };
    const cafe = [58, 42, 30], tostado = [138, 69, 32], gris = [108, 90, 74];
    doc.setTextColor(...gris); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
    doc.text("MINISTERIO DE ALABANZA RENOVACIÓN · ALTO BALLIVIÁN", M, y); y += 30;
    doc.setTextColor(...cafe); doc.setFont("times", "bold"); doc.setFontSize(28); doc.splitTextToSize(r.nombre, W - 2 * M).forEach((ln) => { doc.text(ln, M, y); y += 30; }); y -= 6;
    if (fecha) { doc.setFont("helvetica", "normal"); doc.setFontSize(14); doc.text(fecha, M, y); y += 14; }
    y += 20;
    let n = 0;
    (r.items || []).forEach((it) => {
      if (!esCancion(it)) {
        espacio(40); y += 4; doc.setDrawColor(...gris); doc.setLineWidth(0.6); doc.line(M, y - 10, W - M, y - 10);
        if (it.bloque) { doc.setFont("helvetica", "bold"); doc.setFontSize(9.5); doc.setTextColor(138, 109, 59); doc.text(it.bloque.toUpperCase(), M, y + 4); y += 20; } else y += 4;
        return;
      }
      espacio(22);
      const t = tonoItem(it);
      doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setTextColor(...cafe);
      doc.text(it.alt ? "ó" : `${++n}.`, M, y);
      doc.setFont("helvetica", it.alt ? "normal" : "bold"); doc.text(doc.splitTextToSize(tituloItem(it), W - 2 * M - 80)[0], M + 26, y);
      if (t) { doc.setFont("helvetica", "normal"); doc.setTextColor(...tostado); doc.text(t, W - M, y, { align: "right" }); }
      y += 22;
    });
    idsDe(rid).filter((id) => S.canciones[id].letra).forEach((id) => {
      const c = S.canciones[id], pasos = pasosPara(id, rid), t = A.tonoTranspuesto(c, pasos);
      pagina();
      doc.setTextColor(...cafe); doc.setFont("times", "bold"); doc.setFontSize(20);
      doc.splitTextToSize(c.titulo, W - 2 * M).forEach((ln) => { doc.text(ln, M, y + 6); y += 24; });
      doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.setTextColor(...gris);
      const sub = [t && "Tono " + t, c.bpm && c.bpm + " BPM", c.categoria, c.autor, c.link].filter(Boolean).join("   ·   ");
      if (sub) doc.splitTextToSize(sub, W - 2 * M).forEach((ln) => { doc.text(ln, M, y); y += 13; });
      y += 12;
      const bem = A.usaBemoles(t), tam = 10.5, alto = tam * 1.28, maxCar = Math.floor((W - 2 * M) / (tam * 0.6));
      (c.letra || "").replace(/\r/g, "").split("\n").forEach((linea) => {
        if (A.esSeccion(linea)) {
          espacio(alto * 2.4); y += 6;
          doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(138, 109, 59);
          doc.text(A.nombreSeccion(linea).toUpperCase(), M, y); y += alto; return;
        }
        const { acordes, letra } = A.lineasMonoespacio(linea, pasos, bem);
        doc.setFontSize(tam);
        const largo = Math.max(letra.length, acordes ? acordes.length : 0, 1);
        for (let k = 0; k < largo; k += maxCar) {
          const a = acordes ? acordes.slice(k, k + maxCar) : "", l = letra.slice(k, k + maxCar);
          espacio(alto * (a.trim() ? 2 : 1));
          if (a.trim()) { doc.setFont("courier", "bold"); doc.setTextColor(...tostado); doc.text(a, M, y); y += alto; }
          if (l.trim() || !a.trim()) { doc.setFont("courier", "normal"); doc.setTextColor(...cafe); doc.text(l, M, y); y += alto; }
        }
      });
    });
    const total = doc.internal.getNumberOfPages();
    for (let p = 1; p <= total; p++) {
      doc.setPage(p); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(...gris);
      doc.text(`${r.nombre}${fecha ? " · " + fecha : ""} · ${p}/${total}`, W - M, H - 24, { align: "right" });
    }
    try { await S.fuente.descargar(`${r.nombre}${r.fecha ? " " + r.fecha : ""}.pdf`, doc.output("blob")); avisar("PDF listo."); }
    catch (e) {
      if (e && e.code === "declined") return;
      if (e && e.code === "rate_limited") return avisar("Ya hay una descarga esperando tu confirmación.", true);
      avisar("No se pudo descargar el PDF aquí.", true);
    }
  }

  /* ---------- Gestos ---------- */
  let toque = null;
  document.addEventListener("pointerdown", (e) => { if (e.pointerType === "touch" && S.vista === "cancion") toque = { x: e.clientX, y: e.clientY }; });
  document.addEventListener("pointerup", (e) => {
    if (!toque) return;
    const dx = e.clientX - toque.x, dy = e.clientY - toque.y; toque = null;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2.2) mover(dx < 0 ? 1 : -1);
  });

  /* ---------- Eventos ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-nav]"); if (!a) return;
    e.preventDefault();
    S.buscar = ""; if (a.dataset.nav !== "cancionero") S.categoria = "";
    if (a.dataset.nav === "repertorio") S.rep = null;
    irA(a.dataset.nav);
  });
  document.getElementById("cuenta").addEventListener("click", async (e) => {
    const b = e.target.closest("button"); if (!b) return;
    try {
      if (b.dataset.accion === "equipo") return irA("equipo");
      if (b.dataset.accion === "entrar") await S.fuente.entrar();
      else { await S.fuente.salir(); avisar("Sesión cerrada."); }
    } catch (_) { avisar("No se pudo iniciar sesión. Inténtalo de nuevo.", true); }
  });
  document.getElementById("pasador").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    mover(b.dataset.accion === "siguiente" ? 1 : -1);
  });

  app.addEventListener("input", (e) => {
    if (["buscar-lista", "buscar-elegir", "buscar-lateral"].includes(e.target.id)) { S.buscar = e.target.value; render(); }
    if (e.target.name === "lista") resumenLista();
  });
  app.addEventListener("change", (e) => { if (e.target.id === "orden") { S.orden = e.target.value; render(); } });

  app.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target.id === "buscar-portada") {
      S.buscar = document.getElementById("q-portada").value.trim(); S.categoria = "";
      return irA("cancionero");
    }
    const limpiar = (t) => [...new Set(t.split(/[\s,;]+/).map((x) => x.trim().toLowerCase()).filter((x) => x.includes("@")))];
    if (e.target.id === "form-acceso") {
      try {
        for (const x of INSTRUMENTOS) {
          const permitidos = limpiar(e.target["permitidos-" + x.id].value);
          await S.fuente.guardar("acceso", x.id, { permitidos }); S.acceso[x.id] = { permitidos };
        }
        avisar("Acceso a partituras guardado."); render();
      }
      catch (_) { avisar("No se pudo guardar el acceso.", true); }
      return;
    }
    if (e.target.id === "form-equipo") {
      try { await S.fuente.guardarEquipo({ lideres: limpiar(e.target.lideres.value), miembros: limpiar(e.target.miembros.value) }); avisar("Equipo guardado."); render(); }
      catch (_) { avisar("No se pudo guardar el equipo.", true); }
      return;
    }
    if (e.target.id === "form-rep") {
      const f = e.target, l = leerLista(f.lista.value), nuevo = !S.rep;
      if (S.rep && f.lista.value === f.lista.defaultValue) l.items = rep(S.rep).items;
      const nombre = f.nombre.value.trim() || l.nombre || (f.fecha.value ? nombreDia(f.fecha.value) : "Repertorio");
      if (!f.fecha.value) { f.fecha.focus(); return avisar("Elige la fecha del repertorio.", true); }
      try {
        S.rep = await guardarRepertorio(S.rep, { nombre, fecha: f.fecha.value, items: l.items });
        if (nuevo && !l.items.length) { S.buscar = ""; S.catElegir = ""; return irA("elegir"); }
        irA("repertorio"); avisar("Repertorio guardado.");
      }
      catch (err) { errorGuardar(err); }
      return;
    }
    if (e.target.id !== "form-cancion") return;
    const f = e.target;
    const datos = {
      titulo: f.titulo.value.trim(), autor: f.autor.value.trim(), tono: f.tono.value.trim(),
      bpm: parseInt(f.bpm.value, 10) || "", categoria: f.categoria.value,
      link: f.link.value.trim(), letra: f.letra.value.replace(/\s+$/, ""), actualizado: Date.now(),
    };
    if (!datos.titulo) { f.titulo.focus(); return avisar("Escribe el nombre de la alabanza.", true); }
    if (datos.link && !/^https?:\/\//i.test(datos.link)) datos.link = "https://" + datos.link;
    const antes = S.cancionId && S.canciones[S.cancionId];
    if (fijoDe(antes)) datos.fijo = fijoDe(antes);
    try {
      const id = await guardarCancion(S.cancionId, datos, f.privada.checked);
      S.cancionId = id; S.transponer = fijoDe(datos);
      S.prefill = null;
      irA("cancion"); avisar("Alabanza guardada.");
    } catch (err) { errorGuardar(err); }
  });

  app.addEventListener("click", async (e) => {
    const b = e.target.closest("button, a"); if (!b || b.dataset.nav) return;
    const d = b.dataset;
    const items = ((rep(S.rep) || {}).items || []).slice();

    if (d.accion === "cambiar-ministerio") return window.cambiarMinisterio();
    if (d.accion === "entrar" || d.accion === "salir") {
      try { if (d.accion === "entrar") await S.fuente.entrar(); else await S.fuente.salir(); }
      catch (_) { avisar("No se pudo iniciar sesión. Inténtalo de nuevo.", true); }
      return;
    }
    if (d.rep) { S.rep = d.rep; S.ordenando = false; return irA("repertorio"); }
    if (d.cat !== undefined) { S.categoria = d.cat; if (S.vista !== "cancionero") return irA("cancionero"); return render(); }
    if (d.modoBtn) { if (d.modoBtn === "presentacion") { S.modo = "presentacion"; pintarPresentacion(); } return; }
    if (d.pestana) {
      S.editorPestana = d.pestana;
      const f = document.getElementById("form-cancion"), ver = d.pestana === "ver";
      f.querySelectorAll("[data-pestana]").forEach((x) => x.setAttribute("aria-selected", String(x.dataset.pestana === d.pestana)));
      f.letra.hidden = ver; document.getElementById("vista-previa").hidden = !ver;
      f.querySelectorAll("[data-escribir]").forEach((x) => { x.hidden = ver; });
      if (ver) actualizarVistaPrevia();
      return;
    }
    if (d.abrir) return abrirCancion(d.abrir, d.contexto, d.modo);
    if (d.ver) { verComo = d.ver; pref.guardar("ver", verComo); return render(); }
    if (d.zoom) return cambiarZoom(+d.zoom);
    if (d.agregar) return cambiarItems([...items, { titulo: S.canciones[d.agregar].titulo, tono: "", id: d.agregar }]);
    if (d.sacar) return cambiarItems(items.filter((it) => enlazada(it) !== d.sacar));
    if (d.agregarNombre) { S.buscar = ""; return cambiarItems([...items, { titulo: d.agregarNombre, tono: "" }]); }
    if (d.catElegir !== undefined) { S.catElegir = d.catElegir; return render(); }
    if (d.quitar !== undefined) { items.splice(+d.quitar, 1); return cambiarItems(items); }
    if (d.renombrar !== undefined) {
      const it = items[+d.renombrar], t = prompt("Nombre de esta parte (por ejemplo: 2da Parte, Ofrendas). Déjalo vacío para una línea simple.", it.bloque || "");
      if (t === null) return;
      items[+d.renombrar] = { bloque: t.trim() }; return cambiarItems(items);
    }
    if (d.tono !== undefined) {
      const it = items[+d.tono], t = prompt(`Tono de “${tituloItem(it)}” para este repertorio. Déjalo vacío para usar el de la alabanza.`, it.tono || tonoItem(it));
      if (t === null) return;
      const ac = t.trim() ? A.normalizarAcorde(t.trim().replace(/\s+/g, "")) : "";
      if (ac === null) return avisar("No reconocí ese tono. Escríbelo como G, Ab, C#m o sol+.", true);
      items[+d.tono] = Object.assign({}, it, { tono: ac }); return cambiarItems(items);
    }
    if (d.registrar !== undefined) {
      const it = items[+d.registrar];
      S.prefill = { titulo: it.titulo, tono: it.tono }; S.cancionId = null; S.editorPestana = "escribir"; S.volverA = "repertorio"; S.contexto = S.rep;
      return irA("editar");
    }

    const c = S.canciones[S.cancionId];
    switch (d.accion) {
      case "reps": S.rep = null; return irA("repertorio");
      case "rep-nuevo": S.rep = null; S.ordenando = false; return irA("rep-editar");
      case "ordenar": S.ordenando = true; return render();
      case "ordenar-listo": S.ordenando = false; return render();
      case "separador": {
        const t = prompt("Nombre de esta parte (por ejemplo: 2da Parte, Ofrendas). Déjalo vacío para una línea simple.", "");
        if (t === null) return;
        return cambiarItems([...items, { bloque: t.trim() }]);
      }
      case "rep-editar": return irA("rep-editar");
      case "rep-cancelar": return irA("repertorio");
      case "rep-borrar": {
        const r = rep(S.rep);
        if (!r || !confirm(`¿Borrar el repertorio “${r.nombre}”? Las alabanzas siguen en el cancionero.`)) return;
        try { await S.fuente.borrar("repertorios", r.id); delete S.repertorios[r.id]; S.rep = null; irA("repertorio"); avisar("Repertorio borrado."); }
        catch (err) { errorGuardar(err); }
        return;
      }
      case "elegir": S.buscar = ""; S.catElegir = ""; S.ordenando = false; return irA("elegir");
      case "listo": S.buscar = ""; return irA("repertorio");
      case "limpiar": S.buscar = ""; S.categoria = ""; return render();
      case "copiar": {
        const txt = mensajeWhatsApp(S.rep);
        try { await navigator.clipboard.writeText(txt); avisar("Mensaje copiado. Pégalo en el grupo."); }
        catch (_) {
          const r = document.createRange(); r.selectNodeContents(document.getElementById("mensaje"));
          const s = getSelection(); s.removeAllRanges(); s.addRange(r);
          avisar("Mensaje seleccionado. Cópialo desde el menú del teléfono.");
        }
        return;
      }
      case "pdf": return descargarPDF(S.rep);
      case "partituras-rep": return abrirVisor("Partituras · " + rep(S.rep).nombre, gruposPartitura(cancionesDe(S.rep).map(tituloItem), instrRep()));
      case "partitura": return abrirVisorCancion();
      case "subir-partituras": return subirPartituras();
      case "importar": return importarPendientes();
      case "poner-links": return ponerLinks();
      case "importar-reps": return importarRepertorios();
      case "nueva": S.prefill = null; S.cancionId = null; S.editorPestana = "escribir"; S.volverA = SECCION[S.vista] || "cancionero"; S.contexto = "cancionero"; return irA("editar");
      case "editar": S.editorPestana = "escribir"; return irA("editar");
      case "cancelar-edicion": S.prefill = null; return irA(S.cancionId ? "cancion" : S.volverA === "repertorio" ? (S.vista === "editar" && S.contexto === S.rep ? "repertorio" : "elegir") : "cancionero");
      case "volver": return irA(S.volverA || "cancionero");
      case "anterior": return mover(-1);
      case "siguiente": return mover(1);
      case "tono-subir": S.transponer = (S.transponer + 1) % 12; return render();
      case "tono-bajar": S.transponer = (S.transponer - 1) % 12; return render();
      case "tono-original": S.transponer = fijoDe(c); return render();
      case "tono-fijar": case "tono-quitar-fijo": {
        const pasos = d.accion === "tono-fijar" ? ((S.transponer % 12) + 18) % 12 - 6 : 0;
        const { privada, ...datos } = c;
        if (pasos) datos.fijo = pasos; else delete datos.fijo;
        datos.actualizado = Date.now();
        try {
          await guardarCancion(S.cancionId, datos, !!privada); S.transponer = pasos; render();
          avisar(pasos ? `Fijada en ${tonoActual(S.canciones[S.cancionId])}. Así la verá todo el equipo.` : `Volvió a su tono original, ${A.tonoDe(c)}.`);
        } catch (err) { errorGuardar(err); }
        return;
      }
      case "bpm-mas": case "bpm-menos": {
        const base = metro.bpm || +((c && c.bpm) || 0) || 72;
        metro.bpm = Math.max(30, Math.min(240, base + (d.accion === "bpm-mas" ? 2 : -2)));
        if (metro.activo) metro.iniciar(metro.bpm);
        return render();
      }
      case "metronomo":
        if (metro.activo) metro.parar(); else metro.iniciar(metro.bpm || +((c && c.bpm) || 0) || 72);
        return render();
      case "letra-mas": tamLetra = Math.min(2.2, +(tamLetra + 0.125).toFixed(3)); break;
      case "letra-menos": tamLetra = Math.max(0.9, +(tamLetra - 0.125).toFixed(3)); break;
      case "borrar": S.borrando = true; return render();
      case "borrar-no": S.borrando = false; return render();
      case "borrar-si": {
        const id = S.cancionId;
        try {
          // En los repertorios queda solo el nombre de la alabanza.
          for (const r of Object.values(S.repertorios)) {
            if (r.items.some((it) => it.id === id)) await guardarRepertorio(r.id, { items: r.items.map((it) => (it.id === id ? { titulo: tituloItem(it), tono: it.tono || "" } : it)) });
          }
          const priv = S.canciones[id] && S.canciones[id].privada;
          await S.fuente.borrar(coleccionDe(priv), id);
          delete (priv ? S.privadas : S.publicas)[id]; unirCanciones(); irA("cancionero"); avisar("Alabanza borrada.");
        } catch (err) { errorGuardar(err); }
        return;
      }
      case "acomodar": {
        const f = document.getElementById("form-cancion"), antes = f.letra.value;
        f.letra.value = A.convertirAcordesArriba(antes);
        if (!f.tono.value.trim()) { const t = A.tonoDe({ letra: f.letra.value }); if (t) f.tono.value = t; }
        avisar(antes === f.letra.value ? "No encontré líneas de acordes para acomodar." : "Acordes acomodados. Revisa la vista previa.");
        return;
      }
    }
    if (d.accion === "letra-mas" || d.accion === "letra-menos") {
      pref.guardar("letra", tamLetra); document.documentElement.style.setProperty("--letra", tamLetra + "rem");
    }
  });

  /* ---------- Inicio ---------- */
  document.querySelectorAll("[data-emblema]").forEach((el) => { el.innerHTML = emblema(+el.dataset.emblema, el.dataset.fondo || "var(--crema)"); });
  const llaveEnLink = /(?:^#|&)partituras=([\w-]+)/.exec(location.hash);
  try { S.llave = llaveEnLink ? llaveEnLink[1] : sessionStorage.getItem("cr-llave-part") || ""; } catch (_) { S.llave = llaveEnLink ? llaveEnLink[1] : ""; }
  if (llaveEnLink) {
    try { sessionStorage.setItem("cr-llave-part", S.llave); } catch (_) {}
    try { history.replaceState(null, "", location.pathname); } catch (_) {}
  }
  const inicial = (location.hash || "").slice(1);
  S.vista = ["cancionero", "repertorio"].includes(inicial) ? inicial : "inicio";
  render();
  (async () => {
    let fuente = null;
    try { fuente = await window.Datos.conectar(); } catch (_) {}
    if (!fuente) { S.sinConexion = true; S.cargado = true; S.fuente = { permisos: {} }; return render(); }
    S.fuente = fuente;
    const llegaron = new Set();
    const llego = (k) => { llegaron.add(k); if (llegaron.size === 2) S.cargado = true; render(); };
    const fallo = () => { S.sinConexion = true; S.cargado = true; render(); };
    // Las alabanzas y repertorios son solo del equipo: se escuchan cuando entra un miembro y se sueltan al salir.
    let dejarDatos = [];
    const verDatos = () => {
      const miembro = fuente.modo !== "firebase" || !!(fuente.permisos && fuente.permisos.editar);
      if (miembro && !dejarDatos.length) {
        dejarDatos = [
          fuente.escuchar("canciones", (datos) => { S.publicas = datos; unirCanciones(); llego("canciones"); }, fallo),
          fuente.escuchar("repertorios", (datos) => {
            const r = {};
            for (const [id, x] of Object.entries(datos)) r[id] = leerRepertorio(id, x);
            S.repertorios = r; llego("repertorios");
          }, fallo),
        ];
      } else if (!miembro && dejarDatos.length) {
        dejarDatos.forEach((f) => f && f()); dejarDatos = []; llegaron.clear();
        S.publicas = {}; S.repertorios = {}; S.cargado = false; unirCanciones();
      }
    };
    verDatos();
    // Las de "solo equipo" se cargan cuando entra alguien del equipo y se quitan al salir.
    let dejarPrivadas = null;
    const verPrivadas = () => {
      const miembro = !!(fuente.permisos && fuente.permisos.editar);
      if (miembro && !dejarPrivadas) {
        dejarPrivadas = fuente.escuchar("canciones_equipo", (datos) => { S.privadas = datos; unirCanciones(); render(); }, () => {}) || (() => {});
      } else if (!miembro && dejarPrivadas) {
        dejarPrivadas(); dejarPrivadas = null; S.privadas = {}; unirCanciones();
      }
    };
    verPrivadas();
    // Partituras: se intentan leer con cualquier cuenta; si las reglas no la dejan, simplemente no aparecen.
    let dejar = [];
    const verPartituras = () => {
      dejar.forEach((f) => f && f()); dejar = [];
      S.partituras = {}; S.acceso = {};
      if (fuente.modo !== "local" && !fuente.cuenta) return;
      const porInstr = {};
      const juntar = () => { S.partituras = Object.assign({}, ...Object.values(porInstr)); render(); };
      for (const x of INSTRUMENTOS) {
        dejar.push(fuente.escuchar(coleccionPart(x.id), (datos) => {
          const d = {};
          for (const [id, p] of Object.entries(datos)) d[x.id + "/" + id] = Object.assign({}, p, { instrumentos: [x.id] });
          porInstr[x.id] = d; juntar();
        }, () => { porInstr[x.id] = {}; juntar(); }));
      }
      if (esDueno()) dejar.push(fuente.escuchar("acceso", (datos) => { S.acceso = datos; render(); }, () => {}));
    };
    verPartituras();
    if (fuente.alCambiarCuenta) fuente.alCambiarCuenta(() => { verDatos(); verPrivadas(); verPartituras(); render(); });
  })();

  if ("serviceWorker" in navigator && location.protocol === "https:" && !window.claude) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
