// Ministerio de Alabanza Renovación: sitio, cancionero y repertorios.
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
    metronomo: '<path d="M12 11.5 18 4"/><path d="M8.5 3h7l4 18H4.5Z"/><path d="M7 15h10"/>',
  };
  const ic = (n) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;

  /* ---------- Emblema del ministerio (hasta tener el archivo del logo) ---------- */
  let nEmblema = 0;
  function emblema(tam, fondo) {
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
    vista: "inicio",       // inicio | cancionero | repertorio | elegir | cancion | editar
    canciones: {}, repertorios: {},
    semana: 0, dia: null,
    categoria: "", orden: "az", buscar: "",
    cancionId: null, contexto: "cancionero", volverA: "cancionero",
    transponer: 0, modo: "practica",
    compartir: false, borrando: false, editorPestana: "escribir",
    fuente: null, cargado: false, sinConexion: false,
  };
  const app = document.getElementById("app");

  const pref = {
    leer(k, d) { try { const v = localStorage.getItem("cr-" + k); return v === null ? d : JSON.parse(v); } catch (_) { return d; } },
    guardar(k, v) { try { localStorage.setItem("cr-" + k, JSON.stringify(v)); } catch (_) {} },
  };
  let tamLetra = pref.leer("letra", 1.25);
  let presAcordes = pref.leer("pres-acordes", true);
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
  function finDeSemana(n) {
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    const dia = hoy.getDay();
    const sab = new Date(hoy); sab.setDate(hoy.getDate() + (dia === 0 ? -1 : 6 - dia) + n * 7);
    const dom = new Date(sab); dom.setDate(sab.getDate() + 1);
    return [iso(sab), iso(dom)];
  }
  const idsDe = (f) => ((S.repertorios[f] || {}).canciones || []).filter((id) => S.canciones[id]);
  const puede = (p) => S.cargado && S.fuente && S.fuente.permisos && S.fuente.permisos[p];
  const coincide = (c, q) => !q || normal(`${c.titulo} ${c.autor || ""} ${A.tonoDe(c)} ${(c.letra || "").replace(/\[[^\]]*\]/g, "")}`).includes(q);
  const todas = () => Object.entries(S.canciones).map(([id, c]) => ({ id, ...c }));
  function filtradas() {
    const q = normal(S.buscar);
    const l = todas().filter((c) => (!S.categoria || c.categoria === S.categoria) && coincide(c, q));
    return S.orden === "recientes"
      ? l.sort((a, b) => (b.actualizado || 0) - (a.actualizado || 0))
      : l.sort((a, b) => normal(a.titulo).localeCompare(normal(b.titulo)));
  }
  const detalle = (c) => [c.categoria, c.autor].filter(Boolean).join(" · ");

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
  async function guardarRepertorio(fecha, ids) {
    S.repertorios[fecha] = { fecha, canciones: ids }; render();
    try { await S.fuente.guardar("repertorios", fecha, { fecha, canciones: ids, actualizado: Date.now() }); }
    catch (e) { errorGuardar(e); }
  }

  /* ---------- Letra con acordes ---------- */
  function letraHTML(letra, pasos, tonoFinal) {
    const bem = A.usaBemoles(tonoFinal);
    return (letra || "").replace(/\r/g, "").split("\n").map((l) => {
      if (A.esSeccion(l)) return `<div class="parte">${esc(A.nombreSeccion(l))}</div>`;
      const segs = A.segmentos(l);
      if (!segs.some((s) => s.acorde)) return `<div class="ln">${esc(l) || "&nbsp;"}</div>`;
      return `<div class="ln con-acordes">${segs.map((s) => {
        const ch = s.acorde ? `<b class="ch">${esc(A.transponerAcorde(s.acorde, pasos, bem))}</b>` : "";
        return `<span class="seg${s.acorde && !s.texto.trim() ? " solo" : ""}">${ch}${esc(s.texto) || "&nbsp;"}</span>`;
      }).join("")}</div>`;
    }).join("");
  }

  /* ---------- Vistas ---------- */
  function avisos() {
    let h = "";
    if (S.sinConexion) h += `<p class="aviso">${ic("info")}<span><b>No se pudo abrir el cancionero.</b> Revisa tu conexión y vuelve a cargar la página.</span></p>`;
    if (S.fuente && S.fuente.modo === "local") h += `<p class="aviso">${ic("info")}<span><b>Modo de prueba:</b> lo que guardes queda solo en este dispositivo.</span></p>`;
    if (S.fuente && S.fuente.modo === "firebase" && S.fuente.cuenta && !S.fuente.permisos.editar) h += `<p class="aviso">${ic("info")}<span><b>${esc(S.fuente.cuenta.correo)}</b> todavía no está en la lista del equipo. Pide al líder que te agregue para poder editar.</span></p>`;
    return h;
  }

  function bloqueDia(f) {
    const ids = idsDe(f);
    return `<article class="bloque">
      <div class="bloque__cab"><span class="bloque__icono">${ic("calendario")}</span>
        <div><h2>${nombreDia(f)}</h2><p class="bloque__sub">${fechaCorta(f)} · ${ids.length ? ids.length + (ids.length === 1 ? " alabanza" : " alabanzas") : "repertorio por armar"}</p></div></div>
      ${!S.cargado ? `<div class="esqueleto"></div>` : ids.length
        ? `<ol>${ids.map((id, i) => `<li><button data-abrir="${id}" data-contexto="${f}"><b>${i + 1}</b><span>${esc(S.canciones[id].titulo)}</span><em>${esc(A.tonoDe(S.canciones[id]))}</em></button></li>`).join("")}</ol>`
        : `<p class="bloque__vacio">${puede("editar") ? "Elige las alabanzas para este día." : "Cuando se arme el repertorio, aparecerá aquí."}</p>`}
      <button class="boton boton--chico" data-ir-dia="${f}">${ids.length ? "Ver repertorio" : (puede("editar") ? "Armar repertorio" : "Ver repertorio")} ${ic("flecha")}</button>
    </article>`;
  }

  function vistaInicio() {
    const [sab, dom] = finDeSemana(0);
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
          <a class="boton" href="#repertorio" data-nav="repertorio">${ic("calendario")} Repertorio del fin de semana</a></div>
      </div>
    </section>
    <div class="envoltura" style="padding-bottom:56px;display:grid;gap:28px">
      <div class="inicio-bloques">
        ${bloqueDia(sab)}${bloqueDia(dom)}
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
    const t = A.tonoDe(c);
    return `<li><button class="fila-cancion" data-abrir="${c.id}" data-contexto="${contexto}">
      <span class="fila-cancion__icono">${ic((CATEGORIAS.find((x) => x.id === c.categoria) || {}).icono || "nota")}</span>
      <span class="fila-cancion__texto"><b>${esc(c.titulo)}</b><span>${esc(detalle(c)) || "Sin categoría"}</span></span>
      <span class="fila-cancion__tono">${esc(t)}${ic("der")}</span></button></li>`;
  }

  function vistaCancionero() {
    const lista = filtradas(), total = todas().length;
    const cuenta = (id) => todas().filter((c) => c.categoria === id).length;
    return `<div class="envoltura pagina">
      ${avisos()}
      <div class="fila fila--entre">
        <div class="seccion-titulo"><h1>Cancionero</h1><p>Busca, practica y adora.</p></div>
        ${puede("editar") ? `<button class="boton boton--principal" data-accion="nueva">${ic("mas")} Nueva alabanza</button>` : ""}
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

  function vistaRepertorio() {
    const [sab, dom] = finDeSemana(S.semana);
    if (![sab, dom].includes(S.dia)) S.dia = sab;
    const ids = idsDe(S.dia), editable = puede("editar");
    const tarjeta = (f) => {
      const n = idsDe(f).length;
      return `<button class="dia" role="tab" data-dia="${f}" aria-selected="${S.dia === f}"><span class="dia__nombre">${nombreDia(f)}</span>
        <span class="dia__dato">${fechaCorta(f)} · ${n ? n + (n === 1 ? " alabanza" : " alabanzas") : "sin armar"}</span></button>`;
    };
    let h = `<div class="envoltura pagina">${avisos()}
      <div class="seccion-titulo"><h1>Repertorio</h1><p>Las alabanzas de cada sábado y domingo, en orden.</p></div>
      <div class="semana">
        <button class="boton boton--icono" data-accion="semana-menos" aria-label="Semana anterior">${ic("izq")}</button>
        <div class="dias" role="tablist" aria-label="Día">${tarjeta(sab)}${tarjeta(dom)}</div>
        <button class="boton boton--icono" data-accion="semana-mas" aria-label="Semana siguiente">${ic("der")}</button>
      </div>
      ${S.semana !== 0 ? `<div><button class="boton boton--chico" data-accion="semana-hoy">Volver a esta semana</button></div>` : ""}`;
    if (!S.cargado) return h + `<div class="esqueleto"></div><div class="esqueleto"></div></div>`;
    if (!ids.length) {
      return h + `<div class="vacio"><b>${fechaLarga(S.dia)}: sin alabanzas todavía</b>
        <p>${editable ? "Elige las canciones y ordénalas; el equipo las verá al instante." : "Cuando el líder arme el repertorio, aparecerá aquí."}</p>
        ${editable ? `<button class="boton boton--principal" data-accion="elegir">${ic("mas")} Agregar alabanzas</button>` : ""}</div></div>`;
    }
    const txt = mensajeWhatsApp(S.dia, ids);
    h += `<div class="repertorio"><div style="display:grid;gap:14px;min-width:0">
      <div class="fila fila--entre"><h2 style="font:600 1.375rem/1.2 var(--f-titulo)">${fechaLarga(S.dia)}</h2>
        ${editable ? `<button class="boton boton--chico" data-accion="elegir">${ic("mas")} Agregar</button>` : ""}</div>
      <ol class="lista-rep">${ids.map((id, i) => {
        const c = S.canciones[id], t = A.tonoDe(c);
        return `<li><span class="orden">${i + 1}</span>
          <button class="cancion" data-abrir="${id}" data-contexto="${S.dia}"><b>${esc(c.titulo)}</b><span>${esc([t && "Tono " + t, c.categoria, c.autor].filter(Boolean).join(" · ")) || "&nbsp;"}</span></button>
          ${editable ? `<span class="mover">
            <button class="boton boton--plano boton--chico boton--icono" data-subir="${i}" ${i === 0 ? "disabled" : ""} aria-label="Subir">${ic("arriba")}</button>
            <button class="boton boton--plano boton--chico boton--icono" data-bajar="${i}" ${i === ids.length - 1 ? "disabled" : ""} aria-label="Bajar">${ic("abajo")}</button>
            <button class="boton boton--plano boton--chico boton--icono" data-quitar="${i}" aria-label="Quitar del repertorio">${ic("x")}</button></span>` : "<span></span>"}</li>`;
      }).join("")}</ol>
      <div class="fila"><button class="boton boton--principal" data-abrir="${ids[0]}" data-contexto="${S.dia}" data-modo="presentacion">${ic("pantalla")} Presentar en vivo</button>
        <button class="boton" data-accion="pdf">${ic("bajar")} Descargar PDF</button></div>
    </div>
    <aside class="panel"><h2>Enviar al grupo de WhatsApp</h2><pre class="mensaje" id="mensaje">${esc(txt)}</pre>
      <div class="fila"><button class="boton boton--principal" data-accion="copiar">${ic("copiar")} Copiar</button>
      <a class="boton" href="https://wa.me/?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">${ic("mensaje")} Abrir WhatsApp</a></div></aside>
    </div></div>`;
    return h;
  }

  function vistaElegir() {
    const ids = idsDe(S.dia), lista = filtradas();
    return `<div class="envoltura pagina" style="max-width:48rem">
      <div class="fila fila--entre"><div class="seccion-titulo"><h1>Agregar al ${nombreDia(S.dia).toLowerCase()}</h1><p>${fechaLarga(S.dia)} · ${ids.length} elegidas</p></div>
        <button class="boton boton--principal" data-accion="listo">${ic("check")} Listo</button></div>
      <label class="buscador">${ic("buscar")}<input class="campo" id="buscar-elegir" type="search" enterkeyhint="search" autocomplete="off" placeholder="Buscar canción" value="${esc(S.buscar)}" aria-label="Buscar canción"></label>
      ${lista.length ? `<ul class="lista-rep">${lista.map((c) => {
        const pos = ids.indexOf(c.id), t = A.tonoDe(c);
        return `<li><span class="orden">${pos >= 0 ? pos + 1 : ""}</span>
          <span class="cancion"><b>${esc(c.titulo)}</b><span>${esc([t && "Tono " + t, c.categoria].filter(Boolean).join(" · ")) || "&nbsp;"}</span></span>
          ${pos >= 0 ? `<button class="boton boton--chico" data-sacar="${c.id}">${ic("check")} Agregada</button>`
                     : `<button class="boton boton--chico boton--principal" data-agregar="${c.id}">${ic("mas")} Agregar</button>`}</li>`;
      }).join("")}</ul>`
      : `<div class="vacio"><b>${todas().length ? "Ninguna alabanza coincide" : "Todavía no hay alabanzas registradas"}</b>
          <button class="boton boton--principal" data-accion="nueva">${ic("mas")} Registrar alabanza</button></div>`}
    </div>`;
  }

  function listaContexto() {
    if (S.contexto !== "cancionero" && /^\d{4}-\d{2}-\d{2}$/.test(S.contexto)) return idsDe(S.contexto);
    return filtradas().map((c) => c.id);
  }

  function vistaCancion() {
    const c = S.canciones[S.cancionId];
    if (!c) { S.vista = S.volverA; return render(); }
    const tonoFinal = A.tonoTranspuesto(c, S.transponer), ids = listaContexto();
    const enRep = S.contexto !== "cancionero";
    const bpm = metro.bpm || +c.bpm || 0;
    return `<div class="envoltura pagina">
      <div class="fila"><button class="boton boton--plano" data-accion="volver">${ic("izq")} ${S.volverA === "repertorio" ? "Repertorio" : S.volverA === "inicio" ? "Inicio" : "Cancionero"}</button></div>
      <div class="vista-cancion">
        <aside class="lateral">
          <p class="lateral__titulo">${enRep ? esc(fechaLarga(S.contexto)) : S.categoria || "Todas las canciones"}</p>
          ${enRep ? "" : `<label class="buscador">${ic("buscar")}<input class="campo" id="buscar-lateral" type="search" autocomplete="off" placeholder="Buscar cantos" value="${esc(S.buscar)}" aria-label="Buscar cantos"></label>`}
          <ol>${ids.map((id, i) => `<li><button data-abrir="${id}" data-contexto="${S.contexto}" aria-current="${id === S.cancionId}"><b>${String(i + 1).padStart(2, "0")}</b><span>${esc(S.canciones[id].titulo)}</span></button></li>`).join("")}</ol>
        </aside>
        <div style="display:grid;gap:16px;min-width:0">
          <div class="barra-herr">
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
            </div>
          </div>
          <article class="hoja">
            <header class="hoja__cab"><div><h1>${esc(c.titulo)}</h1>${detalle(c) ? `<p>${esc(detalle(c))}</p>` : ""}</div>
              <div class="fila">${tonoFinal ? `<span class="hoja__tono">Tono: <b>${esc(tonoFinal)}</b></span>` : ""}
                ${S.transponer ? `<button class="boton boton--chico" data-accion="tono-original">Volver a ${esc(A.tonoDe(c))}</button>` : ""}
                ${c.link ? `<a class="boton boton--chico boton--principal" href="${esc(c.link)}" target="_blank" rel="noopener">${ic("play")} Escuchar versión</a>` : ""}</div></header>
            <div class="letra">${letraHTML(c.letra, S.transponer, tonoFinal) || '<p class="ayuda">Esta alabanza todavía no tiene letra.</p>'}</div>
          </article>
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
      <div class="pasador__centro"><b>${i + 1} de ${ids.length}${S.contexto !== "cancionero" ? " · " + nombreDia(S.contexto) : ""}</b><span>${sig ? "Sigue: " + esc(sig.titulo) : "Última de la lista"}</span></div>
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
        <label class="etiqueta">Líderes (pueden borrar)<textarea class="campo" name="lideres" rows="4" autocapitalize="off" spellcheck="false" placeholder="nombre@gmail.com">${lista(f.equipo.lideres)}</textarea></label>
        <label class="etiqueta">Miembros (agregan y editan)<textarea class="campo" name="miembros" rows="8" autocapitalize="off" spellcheck="false" placeholder="nombre@gmail.com">${lista(f.equipo.miembros)}</textarea></label>
        <div class="fila"><button class="boton boton--principal" type="submit">${ic("check")} Guardar equipo</button></div>
      </form></div>`;
  }
  function vistaEditar() {
    const c = S.cancionId ? S.canciones[S.cancionId] || {} : {};
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
        <label class="etiqueta">Categoría<select class="campo" id="f-categoria" name="categoria" style="border-radius:12px;min-height:48px">
          <option value="">Sin categoría</option>${CATEGORIAS.map((x) => `<option ${c.categoria === x.id ? "selected" : ""}>${x.id}</option>`).join("")}</select></label>
        <label class="etiqueta">Link de la versión que seguimos<input class="campo" id="f-link" name="link" type="url" inputmode="url" autocapitalize="none" placeholder="https://youtube.com/…" value="${esc(c.link)}"></label>
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

  /* ---------- Render ---------- */
  const SECCION = { inicio: "inicio", cancionero: "cancionero", repertorio: "repertorio", elegir: "repertorio", editar: "cancionero" };
  function render() {
    const sec = S.vista === "cancion" ? S.volverA : SECCION[S.vista];
    document.querySelectorAll("[data-nav]").forEach((a) => {
      if (a.closest("#app")) return;
      a.toggleAttribute("aria-current", a.dataset.nav === sec);
      if (a.dataset.nav === sec) a.setAttribute("aria-current", "page");
    });
    pintarCuenta();
    if (S.vista === "editar" && document.getElementById("form-cancion")) return;
    if (S.vista === "equipo" && document.getElementById("form-equipo") && document.activeElement && document.activeElement.form) return;
    const foco = document.activeElement && document.activeElement.id;
    const cursor = foco && document.activeElement.selectionStart;
    app.innerHTML = { inicio: vistaInicio, cancionero: vistaCancionero, repertorio: vistaRepertorio, elegir: vistaElegir, cancion: vistaCancion, editar: vistaEditar, equipo: vistaEquipo }[S.vista]();
    const pas = pasadorHTML();
    document.getElementById("pasador").innerHTML = pas;
    document.body.classList.toggle("con-pasador", !!pas);
    if (S.vista === "editar") actualizarVistaPrevia();
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
    S.vista = vista; S.borrando = false; app.innerHTML = ""; render(); window.scrollTo(0, 0);
    const sec = SECCION[vista];
    if (sec && location.hash !== "#" + sec) { try { history.replaceState(null, "", "#" + sec); } catch (_) {} }
  }
  function abrirCancion(id, contexto, modo) {
    if (S.vista !== "cancion") S.volverA = SECCION[S.vista] || "cancionero";
    S.cancionId = id; S.contexto = contexto || "cancionero"; S.transponer = 0;
    metro.parar(); metro.bpm = 0;
    if (modo) S.modo = modo;
    irA("cancion");
  }
  function mover(paso) {
    const ids = listaContexto(), i = ids.indexOf(S.cancionId) + paso;
    if (i < 0 || i >= ids.length) return;
    S.cancionId = ids[i]; S.transponer = 0; S.borrando = false; metro.parar(); metro.bpm = 0;
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
  function mensajeWhatsApp(f, ids) {
    return `*Repertorio · ${fechaLarga(f)}*\n\n` + ids.map((id, i) => `${i + 1}. ${S.canciones[id].titulo}`).join("\n") + `\n\n_Ministerio de Alabanza Renovación_`;
  }
  async function descargarPDF(fecha, ids) {
    if (!window.jspdf) return avisar("No se pudo preparar el PDF. Revisa tu conexión y vuelve a cargar la página.", true);
    const doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), M = 48;
    let y = M;
    const pagina = () => { doc.addPage(); y = M; };
    const espacio = (alto) => { if (y + alto > H - M) pagina(); };
    const cafe = [58, 42, 30], tostado = [138, 69, 32], gris = [108, 90, 74];
    doc.setTextColor(...gris); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
    doc.text("MINISTERIO DE ALABANZA RENOVACIÓN · ALTO BALLIVIÁN", M, y); y += 30;
    doc.setTextColor(...cafe); doc.setFont("times", "bold"); doc.setFontSize(28); doc.text("Repertorio", M, y); y += 24;
    doc.setFont("helvetica", "normal"); doc.setFontSize(14); doc.text(fechaLarga(fecha), M, y); y += 34;
    ids.forEach((id, i) => {
      const c = S.canciones[id], t = A.tonoDe(c);
      doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.setTextColor(...cafe);
      doc.text(`${i + 1}.`, M, y); doc.text(c.titulo, M + 24, y);
      if (t) { doc.setFont("helvetica", "normal"); doc.setTextColor(...tostado); doc.text(t, W - M, y, { align: "right" }); }
      y += 24;
    });
    ids.forEach((id, i) => {
      const c = S.canciones[id], t = A.tonoDe(c);
      pagina();
      doc.setTextColor(...cafe); doc.setFont("times", "bold"); doc.setFontSize(20);
      doc.splitTextToSize(`${i + 1}. ${c.titulo}`, W - 2 * M).forEach((ln) => { doc.text(ln, M, y + 6); y += 24; });
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
        const { acordes, letra } = A.lineasMonoespacio(linea, 0, bem);
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
      doc.text(`${fechaLarga(fecha)} · ${p}/${total}`, W - M, H - 24, { align: "right" });
    }
    try { await S.fuente.descargar(`Repertorio ${fecha}.pdf`, doc.output("blob")); avisar("PDF listo."); }
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
  });
  app.addEventListener("change", (e) => { if (e.target.id === "orden") { S.orden = e.target.value; render(); } });

  app.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target.id === "buscar-portada") {
      S.buscar = document.getElementById("q-portada").value.trim(); S.categoria = "";
      return irA("cancionero");
    }
    if (e.target.id === "form-equipo") {
      const limpiar = (t) => [...new Set(t.split(/[\s,;]+/).map((x) => x.trim().toLowerCase()).filter((x) => x.includes("@")))];
      try { await S.fuente.guardarEquipo({ lideres: limpiar(e.target.lideres.value), miembros: limpiar(e.target.miembros.value) }); avisar("Equipo guardado."); render(); }
      catch (_) { avisar("No se pudo guardar el equipo.", true); }
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
    try {
      const id = await S.fuente.guardar("canciones", S.cancionId, datos);
      S.canciones[id] = datos; S.cancionId = id; S.transponer = 0;
      if (S.volverA === "repertorio" && S.vista === "editar" && !S.contexto.match(/^\d/)) S.contexto = "cancionero";
      irA("cancion"); avisar("Alabanza guardada.");
    } catch (err) { errorGuardar(err); }
  });

  app.addEventListener("click", async (e) => {
    const b = e.target.closest("button, a"); if (!b || b.dataset.nav) return;
    const d = b.dataset;
    const ids = idsDe(S.dia || finDeSemana(0)[0]);

    if (d.dia) { S.dia = d.dia; return render(); }
    if (d.irDia) { S.dia = d.irDia; S.semana = 0; return irA("repertorio"); }
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
    if (d.agregar) return guardarRepertorio(S.dia, [...ids, d.agregar]);
    if (d.sacar) return guardarRepertorio(S.dia, ids.filter((x) => x !== d.sacar));
    if (d.quitar !== undefined) { const n = [...ids]; n.splice(+d.quitar, 1); return guardarRepertorio(S.dia, n); }
    if (d.subir !== undefined) { const i = +d.subir, n = [...ids]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return guardarRepertorio(S.dia, n); }
    if (d.bajar !== undefined) { const i = +d.bajar, n = [...ids]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; return guardarRepertorio(S.dia, n); }

    const c = S.canciones[S.cancionId];
    switch (d.accion) {
      case "semana-menos": S.semana--; S.dia = finDeSemana(S.semana)[0]; return render();
      case "semana-mas": S.semana++; S.dia = finDeSemana(S.semana)[0]; return render();
      case "semana-hoy": S.semana = 0; S.dia = finDeSemana(0)[0]; return render();
      case "elegir": S.buscar = ""; S.categoria = ""; return irA("elegir");
      case "listo": S.buscar = ""; return irA("repertorio");
      case "limpiar": S.buscar = ""; S.categoria = ""; return render();
      case "copiar": {
        const txt = mensajeWhatsApp(S.dia, ids);
        try { await navigator.clipboard.writeText(txt); avisar("Mensaje copiado. Pégalo en el grupo."); }
        catch (_) {
          const r = document.createRange(); r.selectNodeContents(document.getElementById("mensaje"));
          const s = getSelection(); s.removeAllRanges(); s.addRange(r);
          avisar("Mensaje seleccionado. Cópialo desde el menú del teléfono.");
        }
        return;
      }
      case "pdf": return descargarPDF(S.dia, ids);
      case "nueva": S.cancionId = null; S.editorPestana = "escribir"; S.volverA = SECCION[S.vista] || "cancionero"; S.contexto = "cancionero"; return irA("editar");
      case "editar": S.editorPestana = "escribir"; return irA("editar");
      case "cancelar-edicion": return irA(S.cancionId ? "cancion" : S.volverA === "repertorio" ? "elegir" : "cancionero");
      case "volver": return irA(S.volverA || "cancionero");
      case "anterior": return mover(-1);
      case "siguiente": return mover(1);
      case "tono-subir": S.transponer = (S.transponer + 1) % 12; return render();
      case "tono-bajar": S.transponer = (S.transponer - 1) % 12; return render();
      case "tono-original": S.transponer = 0; return render();
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
          for (const [f, r] of Object.entries(S.repertorios)) {
            if ((r.canciones || []).includes(id)) await S.fuente.guardar("repertorios", f, { fecha: f, canciones: r.canciones.filter((x) => x !== id), actualizado: Date.now() });
          }
          await S.fuente.borrar("canciones", id);
          delete S.canciones[id]; irA("cancionero"); avisar("Alabanza borrada.");
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
  S.dia = finDeSemana(0)[0];
  const inicial = (location.hash || "").slice(1);
  S.vista = ["cancionero", "repertorio"].includes(inicial) ? inicial : "inicio";
  render();
  (async () => {
    let fuente = null;
    try { fuente = await window.Datos.conectar(); } catch (_) {}
    if (!fuente) { S.sinConexion = true; S.cargado = true; S.fuente = { permisos: {} }; return render(); }
    S.fuente = fuente;
    if (fuente.alCambiarCuenta) fuente.alCambiarCuenta(() => render());
    const llegaron = new Set();
    const llego = (k) => { llegaron.add(k); if (llegaron.size === 2) S.cargado = true; render(); };
    const fallo = () => { S.sinConexion = true; S.cargado = true; render(); };
    fuente.escuchar("canciones", (datos) => { S.canciones = datos; llego("canciones"); }, fallo);
    fuente.escuchar("repertorios", (datos) => {
      const r = {};
      for (const [id, x] of Object.entries(datos)) r[id] = { fecha: id, canciones: Array.isArray(x.canciones) ? x.canciones : [] };
      S.repertorios = r; llego("repertorios");
    }, fallo);
  })();

  if ("serviceWorker" in navigator && location.protocol === "https:" && !window.claude) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
