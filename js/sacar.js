// Sacar acordes: se pega el link de YouTube de la versión que siguen (o se sube el audio) y el analizador
// (servidor-acordes/) devuelve los acordes con su tiempo, el tono y el BPM. Se revisan escuchando,
// se corrigen tocando cada acorde y pasan a una alabanza nueva.
// Cada corrección se guarda en "analisis": es el material para ajustar el modelo al estilo del ministerio.
(function (global) {
  "use strict";
  const A = global.Acordes;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reloj = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const idVideo = (url) => { const m = /(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/.exec(url || ""); return m ? m[1] : ""; };

  // ctx: { fuente, ic, avisar, volver(), crearAlabanza(prefill) } lo pone app.js.
  let ctx, raiz, R, docId, guardarT, tic, reproductor, actual = -1, elegido = -1, archivoUrl = "";

  function montar(contenedor, c, link) {
    ctx = c; raiz = contenedor; R = null; docId = null; actual = -1; elegido = -1; reproductor = null;
    if (archivoUrl) { URL.revokeObjectURL(archivoUrl); archivoUrl = ""; }
    clearInterval(tic);
    raiz.innerHTML = `<div class="envoltura pagina sacar">
      <div class="fila"><button class="boton boton--plano" type="button" data-sacar="volver">${ctx.ic("izq")} Cancionero</button></div>
      <div class="seccion-titulo"><h1>Sacar acordes</h1>
        <p>Pega el link de YouTube de la versión que siguen. En un minuto tienes los acordes, el tono y el tempo para revisar.</p></div>
      ${global.ANALIZADOR_ACORDES ? "" : `<p class="aviso">${ctx.ic("info")}<span>El analizador todavía no está publicado. Cuando esté, esta sección empieza a funcionar sola.</span></p>`}
      <form class="sacar__pedido" id="form-sacar" novalidate>
        <label class="etiqueta">Link de YouTube<input class="campo" name="url" type="url" inputmode="url" autocapitalize="none" autocomplete="off" placeholder="https://youtube.com/watch?v=…" value="${esc(link || "")}"></label>
        <div class="fila"><button class="boton boton--principal" type="submit">${ctx.ic("varita")} Sacar acordes</button>
          <label class="boton boton--plano sacar__subir">${ctx.ic("nota")} O sube el audio<input type="file" name="audio" accept="audio/*,video/mp4" hidden></label></div>
      </form>
      <div id="sacar-estado" aria-live="polite"></div>
      <div id="sacar-resultado"></div>
    </div>`;
    raiz.addEventListener("submit", alEnviar);
    raiz.addEventListener("change", alCambiar);
    raiz.addEventListener("click", alTocar);
    raiz.addEventListener("input", alEscribir);
    if (link && idVideo(link) && global.ANALIZADOR_ACORDES) pedir({ url: link });
  }

  /* ---------- Pedir al analizador ---------- */
  async function pedir({ url, archivo }) {
    const servidor = String(global.ANALIZADOR_ACORDES || "").replace(/\/$/, "");
    if (!servidor) return ctx.avisar("El analizador todavía no está publicado.", true);
    const estado = raiz.querySelector("#sacar-estado");
    raiz.querySelector("#sacar-resultado").innerHTML = "";
    raiz.querySelectorAll("#form-sacar button, #form-sacar input").forEach((x) => { x.disabled = true; });
    const inicio = Date.now();
    const pasos = archivo ? [[0, "Subiendo el audio…"], [6, "Escuchando los acordes…"], [45, "Acomodando los acordes al compás…"]]
      : [[0, "Bajando el audio de YouTube…"], [12, "Escuchando los acordes…"], [55, "Acomodando los acordes al compás…"]];
    const pintar = () => {
      const s = (Date.now() - inicio) / 1000, paso = pasos.filter((p) => s >= p[0]).pop()[1];
      estado.innerHTML = `<div class="sacar__cargando"><span class="sacar__onda" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
        <div><b>${paso}</b><span>${reloj(s)} · Tarda cerca de 1 minuto por cada 3 minutos de canción${s > 20 ? ". Si el analizador estaba dormido, el primer pedido tarda un poco más." : "."}</span></div></div>`;
    };
    pintar(); const t = setInterval(pintar, 1000);
    try {
      const token = ctx.fuente && ctx.fuente.token ? await ctx.fuente.token() : "";
      // El túnel gratis de ngrok (analizador en la PC) muestra un aviso en vez de responder si no se le pide saltarlo.
      const cab = Object.assign({ "ngrok-skip-browser-warning": "1" }, token ? { Authorization: "Bearer " + token } : {});
      let r;
      if (archivo) {
        const datos = new FormData(); datos.append("audio", archivo);
        r = await fetch(servidor + "/analizar-audio", { method: "POST", headers: cab, body: datos });
      } else {
        r = await fetch(servidor + "/analizar", { method: "POST", headers: Object.assign({ "Content-Type": "application/json" }, cab), body: JSON.stringify({ url }) });
      }
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.detail || "El analizador no respondió bien. Inténtalo de nuevo.");
      if (!j.acordes || !j.acordes.length) throw new Error("No encontré acordes en ese audio.");
      R = Object.assign(j, { original: j.acordes.map((s) => Object.assign({}, s)), link: url || "" });
      docId = j.video || null;
      if (archivo) { archivoUrl = URL.createObjectURL(archivo); }
      estado.innerHTML = "";
      pintarResultado();
    } catch (e) {
      const msg = e && e.message && !/fetch|network|load failed/i.test(e.message) ? e.message : "No pude conectar con el analizador. Revisa tu señal e inténtalo de nuevo.";
      estado.innerHTML = `<p class="aviso aviso--error">${ctx.ic("info")}<span>${esc(msg)}</span></p>`;
    } finally {
      clearInterval(t);
      raiz.querySelectorAll("#form-sacar button, #form-sacar input").forEach((x) => { x.disabled = false; });
    }
  }

  /* ---------- Resultado ---------- */
  function pintarResultado() {
    const caja = raiz.querySelector("#sacar-resultado");
    const cambios = R.acordes.filter((s) => s.acorde).length;
    caja.innerHTML = `<section class="sacar__resultado">
      ${R.titulo ? `<h2 class="sacar__titulo">${esc(R.titulo)}</h2>` : ""}
      <div class="sacar__medio">${R.video ? `<div id="sacar-yt"></div>` : `<audio id="sacar-audio" controls preload="auto" src="${archivoUrl}"></audio>`}</div>
      <dl class="sacar__datos">
        <div><dt>Tono</dt><dd>${esc(R.tono || "—")}</dd></div>
        <div class="sacar__tempo"><dt>Tempo</dt><dd><span id="sacar-bpm">${R.bpm ? R.bpm + " <small>BPM</small>" : "—"}</span>
          ${R.bpm ? `<span class="sacar__bpm-ajuste" aria-label="Ajustar tempo"><button type="button" class="chip" data-bpm="0.5" aria-label="La mitad">½</button><button type="button" class="chip" data-bpm="2" aria-label="El doble">×2</button></span>` : ""}</dd></div>
        <div><dt>Acordes</dt><dd>${cambios}</dd></div>
      </dl>
      <p class="ayuda">Dale play y sigue el acorde marcado. Toca un acorde para escuchar desde ahí y corregirlo; los que corrijas quedan marcados con un punto.</p>
      <ol class="linea-tiempo" id="linea-tiempo">${R.acordes.map(tramoHTML).join("")}</ol>
      <div id="corrector"></div>
      <div class="fila sacar__acciones">
        <button class="boton boton--principal" type="button" data-sacar="crear">${ctx.ic("mas")} Crear alabanza con estos acordes</button>
        <button class="boton" type="button" data-sacar="copiar">${ctx.ic("copiar")} Copiar acordes</button>
      </div>
      <p class="ayuda sacar__nota" id="sacar-guardado">El analizador reconoce acordes mayores y menores. Las séptimas, sus y bajos (G/B) agrégalos tú al corregir.</p>
    </section>`;
    if (R.video) ponerYouTube(R.video);
    clearInterval(tic);
    tic = setInterval(seguir, 200);
  }
  // Lo que dijo el analizador en ese momento (las correcciones y uniones no tocan R.original).
  const original = (s) => (R.original.find((o) => s.ini >= o.ini && s.ini < o.fin) || {}).acorde || "";
  function tramoHTML(s, i) {
    const dur = s.fin - s.ini;
    const corregido = s.acorde !== original(s);
    return `<li><button type="button" class="tramo${s.acorde ? "" : " tramo--vacio"}${corregido ? " tramo--corregido" : ""}${i === actual ? " es-actual" : ""}${i === elegido ? " es-elegido" : ""}"
      data-tramo="${i}" style="--ancho:${Math.min(220, Math.max(56, dur * 18)).toFixed(0)}px" aria-label="${esc(s.acorde || "Sin acorde")} en ${reloj(s.ini)}">
      <b>${esc(s.acorde || "–")}</b><small>${reloj(s.ini)}</small></button></li>`;
  }
  function repintarTramo(i) {
    const li = raiz.querySelector(`[data-tramo="${i}"]`);
    if (li) li.parentElement.outerHTML = tramoHTML(R.acordes[i], i);
  }

  /* ---------- Reproducir y seguir el acorde ---------- */
  function ponerYouTube(video) {
    const crear = () => {
      reproductor = new global.YT.Player("sacar-yt", { videoId: video, width: "100%", height: "100%", playerVars: { playsinline: 1, rel: 0, modestbranding: 1 } });
    };
    if (global.YT && global.YT.Player) return crear();
    const antes = global.onYouTubeIframeAPIReady;
    global.onYouTubeIframeAPIReady = () => { if (antes) antes(); crear(); };
    if (!document.getElementById("yt-api")) {
      const s = document.createElement("script"); s.id = "yt-api"; s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  }
  function tiempo() {
    if (R && R.video) return reproductor && reproductor.getCurrentTime ? reproductor.getCurrentTime() : -1;
    const a = raiz && raiz.querySelector("#sacar-audio");
    return a ? a.currentTime : -1;
  }
  function sonando() {
    if (R && R.video) return !!(reproductor && reproductor.getPlayerState && reproductor.getPlayerState() === 1);
    const a = raiz && raiz.querySelector("#sacar-audio");
    return !!(a && !a.paused);
  }
  function irAl(seg) {
    if (R.video) { if (reproductor && reproductor.seekTo) { reproductor.seekTo(seg, true); reproductor.playVideo(); } }
    else { const a = raiz.querySelector("#sacar-audio"); if (a) { a.currentTime = seg; a.play().catch(() => {}); } }
  }
  function seguir() {
    if (!raiz || !raiz.isConnected) { clearInterval(tic); return; }
    const t = tiempo(); if (t < 0) return;
    const i = R.acordes.findIndex((s) => t >= s.ini && t < s.fin);
    if (i === actual) return;
    const antes = raiz.querySelector(".tramo.es-actual"); if (antes) antes.classList.remove("es-actual");
    actual = i;
    const b = raiz.querySelector(`[data-tramo="${i}"]`);
    if (b) { b.classList.add("es-actual"); if (sonando() && elegido < 0) b.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
  }

  /* ---------- Corregir ---------- */
  // Los acordes del tono (I ii iii IV V vi bVII; en menor i III iv v VI VII), para corregir con un toque.
  function delTono() {
    const t = R.tono || "";
    if (!t) return [];
    const menor = /m$/.test(t), base = menor ? ["Am", "C", "Dm", "Em", "E", "F", "G"] : ["C", "Dm", "Em", "F", "G", "Am", "Bb"];
    const pasos = A.pasosEntre(menor ? "Am" : "C", t), bem = A.usaBemoles(t);
    return base.map((a) => A.transponerAcorde(a, pasos, bem));
  }
  function abrirCorrector(i) {
    const viejo = elegido; elegido = i;
    if (viejo >= 0) repintarTramo(viejo);
    repintarTramo(i);
    const s = R.acordes[i], orig = original(s);
    const caja = raiz.querySelector("#corrector");
    caja.innerHTML = `<div class="corrector" role="group" aria-label="Corregir acorde">
      <div class="fila fila--entre"><b>De ${reloj(s.ini)} a ${reloj(s.fin)}</b>
        <button class="boton boton--chico boton--icono boton--plano" type="button" data-sacar="cerrar" aria-label="Cerrar">${ctx.ic("x")}</button></div>
      <div class="chips">${[...new Set(delTono())].map((a) => `<button type="button" class="chip" data-poner="${esc(a)}" aria-pressed="${a === s.acorde}">${esc(a)}</button>`).join("")}
        <button type="button" class="chip" data-poner="" aria-pressed="${!s.acorde}">Sin acorde</button></div>
      <label class="etiqueta">Otro acorde<input class="campo" id="corrector-acorde" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="G7, D/F#, sol+" value="${esc(s.acorde)}"></label>
      <div class="fila">
        <button class="boton boton--chico" type="button" data-sacar="escuchar">${ctx.ic("play")} Escuchar de nuevo</button>
        ${i > 0 ? `<button class="boton boton--chico" type="button" data-sacar="unir">Unir con el anterior</button>` : ""}
        ${s.acorde !== orig ? `<button class="boton boton--chico boton--plano" type="button" data-sacar="deshacer">Volver a ${esc(orig || "sin acorde")}</button>` : ""}
      </div></div>`;
  }
  function poner(i, acorde) {
    R.acordes[i].acorde = acorde;
    repintarTramo(i); abrirCorrector(i); guardarPronto();
  }
  function alEscribir(e) {
    if (e.target.id !== "corrector-acorde" || elegido < 0) return;
    const v = e.target.value.trim(), ac = v ? A.normalizarAcorde(v.replace(/\s+/g, "")) : "";
    e.target.toggleAttribute("aria-invalid", ac === null);
    if (ac === null) return;
    R.acordes[elegido].acorde = ac;
    repintarTramo(elegido); guardarPronto();
    raiz.querySelectorAll("#corrector [data-poner]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.poner === ac)));
  }

  // Se guarda solo, un momento después de cada corrección: análisis original + lo corregido.
  function guardarPronto() {
    clearTimeout(guardarT);
    guardarT = setTimeout(guardarCorrecciones, 1500);
  }
  async function guardarCorrecciones() {
    if (!R || !ctx.fuente || !ctx.fuente.guardar) return;
    const corregidos = R.acordes.filter((s) => s.acorde !== original(s)).length + Math.max(0, R.original.length - R.acordes.length);
    const doc = {
      video: R.video || "", link: R.link || "", titulo: R.titulo || "", modelo: R.modelo || "", tono: R.tono || "", bpm: R.bpm || 0,
      duracion: R.duracion || 0, original: R.original, acordes: R.acordes.map((s) => ({ ini: s.ini, fin: s.fin, acorde: s.acorde })),
      corregidos, por: (ctx.fuente.cuenta && ctx.fuente.cuenta.correo) || "", actualizado: Date.now(),
    };
    try {
      docId = await ctx.fuente.guardar("analisis", docId, doc);
      const n = raiz.querySelector("#sacar-guardado");
      if (n && corregidos) n.textContent = `${corregidos} ${corregidos === 1 ? "corrección guardada" : "correcciones guardadas"}. Con ellas el analizador va a aprender el estilo del ministerio.`;
    } catch (_) { /* sin permiso o sin señal: las correcciones siguen en pantalla */ }
  }

  /* ---------- Pasar a una alabanza ---------- */
  // Cuatro acordes por renglón; los renglones iguales seguidos se juntan con "(x2)".
  function cifrado() {
    const acs = [];
    for (const s of R.acordes) if (s.acorde && s.acorde !== acs[acs.length - 1]) acs.push(s.acorde);
    const lineas = [];
    for (let i = 0; i < acs.length; i += 4) lineas.push(acs.slice(i, i + 4).map((a) => `[${a}]`).join("  "));
    const out = [];
    for (const l of lineas) {
      const u = out[out.length - 1];
      if (u && u.l === l) u.n++; else out.push({ l, n: 1 });
    }
    return out.map((x) => x.l + (x.n > 1 ? `  (x${x.n})` : "")).join("\n");
  }

  /* ---------- Eventos ---------- */
  function alEnviar(e) {
    if (e.target.id !== "form-sacar") return;
    e.preventDefault();
    const url = e.target.url.value.trim();
    if (!idVideo(url)) { e.target.url.focus(); return ctx.avisar("Pega un link de YouTube.", true); }
    pedir({ url });
  }
  function alCambiar(e) {
    if (e.target.name !== "audio" || !e.target.files[0]) return;
    const f = e.target.files[0]; e.target.value = "";
    if (f.size > 40 * 1024 * 1024) return ctx.avisar("El archivo pasa de 40 MB.", true);
    pedir({ archivo: f });
  }
  async function alTocar(e) {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.tramo !== undefined) { const i = +b.dataset.tramo; irAl(R.acordes[i].ini); return abrirCorrector(i); }
    if (b.dataset.poner !== undefined) return poner(elegido, b.dataset.poner);
    // En las lentas el pulso a veces sale al doble (o al revés en las rápidas): se corrige con un toque.
    if (b.dataset.bpm) {
      R.bpm = Math.round(R.bpm * +b.dataset.bpm);
      raiz.querySelector("#sacar-bpm").innerHTML = R.bpm + " <small>BPM</small>";
      return guardarPronto();
    }
    switch (b.dataset.sacar) {
      case "volver": return ctx.volver();
      case "cerrar": { const v = elegido; elegido = -1; repintarTramo(v); raiz.querySelector("#corrector").innerHTML = ""; return; }
      case "escuchar": return irAl(R.acordes[elegido].ini);
      case "deshacer": return poner(elegido, original(R.acordes[elegido]));
      case "unir": {
        const i = elegido; R.acordes[i - 1].fin = R.acordes[i].fin; R.acordes.splice(i, 1);
        elegido = -1; pintarResultado(); guardarPronto(); return;
      }
      case "copiar":
        try { await navigator.clipboard.writeText(cifrado()); ctx.avisar("Acordes copiados."); }
        catch (_) { ctx.avisar("No se pudo copiar.", true); }
        return;
      case "crear":
        clearTimeout(guardarT); guardarCorrecciones();
        return ctx.crearAlabanza({ titulo: R.titulo || "", tono: R.tono || "", bpm: R.bpm || "", link: R.link || "", letra: cifrado() + "\n\n" });
    }
  }

  global.Sacar = { montar };
})(window);
