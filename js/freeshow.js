// FreeShow: llevar alabanzas y repertorios al programa de proyección.
//  - Texto (.txt) de una alabanza: en FreeShow, Importar › Texto.
//  - Proyecto (.project) de un repertorio: en FreeShow, Importar › Proyecto.
//  - Envío directo por la API de FreeShow (Ajustes › Conexiones), cuando el Cancionero
//    está abierto en la misma computadora que FreeShow.
(function (global) {
  "use strict";
  const A = global.Acordes;

  // Partes que FreeShow conoce: así les pone su color y su nombre ("Verso 1", "Coro").
  const GRUPOS = [
    [/^(verso|estrofa)/i, "verse"], [/^pre-?\s?coro/i, "pre_chorus"], [/^coro/i, "chorus"], [/^puente/i, "bridge"],
    [/^intro/i, "intro"], [/^(final|outro)/i, "outro"], [/^(tag|vamp)/i, "tag"], [/^(interludio|instrumental|solo)/i, "break"],
  ];
  const grupoGlobal = (nombre) => (GRUPOS.find(([re]) => re.test(nombre)) || [])[1] || "";
  const uid = (n = 12) => Array.from(crypto.getRandomValues(new Uint8Array(n)), (b) => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");

  // Letra → partes: [{ nombre, estrofas: [[{ texto, acordes: [{ pos, key }] }]] }]
  // Las líneas que solo tienen acordes (intro, instrumental) no se proyectan.
  function partes(c, pasos, conAcordes) {
    const lista = [];
    let parte = { nombre: "", estrofas: [[]] };
    const cerrarEstrofa = () => { if (parte.estrofas[parte.estrofas.length - 1].length) parte.estrofas.push([]); };
    const cerrarParte = () => { parte.estrofas = parte.estrofas.filter((e) => e.length); if (parte.estrofas.length) lista.push(parte); };
    const tono = conAcordes ? A.tonoTranspuesto(c, pasos) : "";
    const bem = A.usaBemoles(tono);
    String(c.letra || "").replace(/\r/g, "").split("\n").forEach((linea) => {
      if (!linea.trim()) return cerrarEstrofa();
      if (A.esSeccion(linea)) { cerrarParte(); parte = { nombre: A.nombreSeccion(linea), estrofas: [[]] }; return; }
      let texto = "";
      const acordes = [];
      A.segmentos(linea).forEach((s) => {
        if (s.acorde && conAcordes) acordes.push({ pos: texto.length, key: A.transponerAcorde(s.acorde, pasos, bem) });
        texto += s.texto;
      });
      texto = texto.replace(/\s+/g, " ");
      const corte = texto.length - texto.trimStart().length;
      texto = texto.trim();
      if (!texto) return;
      parte.estrofas[parte.estrofas.length - 1].push({ texto, acordes: acordes.map((a) => ({ ...a, pos: Math.max(0, Math.min(texto.length, a.pos - corte)) })) });
    });
    cerrarParte();
    return lista;
  }

  // Formato de texto de FreeShow: "[Coro]" en su línea, estrofas separadas por una línea en blanco,
  // acordes entre corchetes dentro de la letra.
  function texto(c, pasos = 0, conAcordes = false) {
    const conCorchetes = (l) => {
      let s = l.texto;
      [...l.acordes].sort((a, b) => b.pos - a.pos).forEach((a) => { s = s.slice(0, a.pos) + `[${a.key}]` + s.slice(a.pos); });
      return s.replace(/=/g, "-"); // "=" FreeShow lo toma como dato (Autor=…)
    };
    return partes(c, pasos, conAcordes).map((p) => {
      const cuerpo = p.estrofas.map((e) => e.map(conCorchetes).join("\n")).join("\n\n");
      return (p.nombre ? `[${p.nombre}]\n` : "") + cuerpo;
    }).join("\n\n") + "\n";
  }

  // Una presentación de FreeShow (formato .show) con la letra por partes.
  const ESTILO = "top:88px;left:50px;height:904px;width:1820px;";
  function presentacion(c, nombre, pasos, conAcordes, tono) {
    const capa = uid(), diapositivas = {}, orden = [];
    const caja = (estrofa) => [{ type: "text", style: ESTILO, lines: estrofa.map((l) => ({
      align: "", text: [{ value: l.texto, style: "" }],
      ...(l.acordes.length ? { chords: l.acordes.map((a) => ({ id: uid(5), pos: a.pos, key: a.key })) } : {}),
    })) }];
    const lista = partes(c, pasos, conAcordes);
    lista.forEach((p, i) => {
      const nombreParte = p.nombre || (i === 0 ? "Verso" : "");
      const ids = p.estrofas.map(() => uid());
      const g = grupoGlobal(nombreParte || "Verso");
      diapositivas[ids[0]] = { group: nombreParte || "Verso", color: null, ...(g ? { globalGroup: g } : {}), settings: {}, notes: "", items: caja(p.estrofas[0]), ...(ids.length > 1 ? { children: ids.slice(1) } : {}) };
      ids.slice(1).forEach((id, k) => { diapositivas[id] = { group: null, color: null, settings: {}, notes: "", items: caja(p.estrofas[k + 1]) }; });
      orden.push({ id: ids[0] });
    });
    const ahora = Date.now();
    return {
      name: nombre, category: null, settings: { activeLayout: capa, template: null },
      timestamps: { created: ahora, modified: null, used: null }, quickAccess: {},
      meta: { title: c.titulo || nombre, ...(c.autor ? { artist: c.autor } : {}), ...(tono ? { key: tono } : {}) },
      slides: diapositivas, layouts: { [capa]: { name: "Principal", notes: "", slides: orden } }, media: {},
    };
  }

  // Proyecto (.project) con las alabanzas en orden y las partes ("2da Parte") como secciones.
  // pasos: [{ tipo: "seccion", nombre } | { tipo: "cancion", c, tono, pasos }]
  function proyecto(nombre, pasos, conAcordes) {
    const shows = {}, items = [];
    pasos.forEach((p) => {
      if (p.tipo === "seccion") return items.push({ id: uid(5), type: "section", name: p.nombre });
      const id = uid();
      shows[id] = presentacion(p.c, p.c.titulo, p.pasos, conAcordes, p.tono);
      items.push({ id, type: "show" });
    });
    const ahora = Date.now();
    return { project: { id: uid(), name: nombre, created: ahora, modified: ahora, used: ahora, parent: "/", shows: items }, shows };
  }

  /* ---------- Envío directo (API de FreeShow por WebSocket, puerto 5505) ---------- */
  const SOCKET_IO = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.5/socket.io.min.js";
  function cargarSocketIO() {
    if (global.io) return Promise.resolve();
    return new Promise((ok, mal) => {
      const s = document.createElement("script");
      s.src = SOCKET_IO; s.onload = ok; s.onerror = () => mal({ code: "sin-red" });
      document.head.appendChild(s);
    });
  }
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));
  const clave = (t) => String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

  async function conectar({ puerto = 5505, clave: token = "" } = {}) {
    await cargarSocketIO();
    const socket = global.io("http://localhost:" + puerto, { transports: ["websocket"], reconnection: false, timeout: 4000, auth: token ? { token } : undefined });
    await new Promise((ok, mal) => {
      socket.once("connect", ok);
      socket.once("connect_error", () => mal({ code: "sin-freeshow" }));
    });
    let esperando = null;
    socket.on("data", (d) => {
      if (d && d.status === 401) { if (esperando) esperando.mal({ code: "clave" }); esperando = null; return; }
      if (esperando && d && d.action === esperando.accion) { esperando.ok(d.data); esperando = null; }
    });
    const enviar = (accion, datos = {}) => socket.emit("data", JSON.stringify({ action: accion, ...datos, ...(token ? { token } : {}) }));
    const pedir = (accion, datos) => new Promise((ok, mal) => {
      esperando = { accion, ok, mal };
      enviar(accion, datos);
      setTimeout(() => { if (esperando && esperando.accion === accion) { esperando = null; mal({ code: "sin-respuesta" }); } }, 8000);
    });
    return { enviar, pedir, cerrar: () => socket.close() };
  }

  // Busca la presentación del ministerio ("REN - Título") o una que ya se haya enviado ("Título").
  function buscarShow(shows, titulo) {
    const k = clave(titulo), lista = Object.entries(shows || {}).filter(([, s]) => s && !s.private);
    const de = (nombre) => (lista.find(([, s]) => clave(s.name) === nombre) || [])[0];
    return de(clave("REN - " + titulo)) || de(k) || null;
  }

  // Arma el proyecto en FreeShow: usa las presentaciones que ya existen y crea las que faltan.
  async function enviarRepertorio(nombre, pasos, conAcordes, opciones, progreso = () => {}) {
    const fs = await conectar(opciones);
    try {
      let shows = await fs.pedir("get_shows");
      const canciones = pasos.filter((p) => p.tipo === "cancion");
      const nuevas = canciones.filter((p) => !buscarShow(shows, p.titulo) && p.c && p.c.letra);
      const sinLetra = canciones.filter((p) => !buscarShow(shows, p.titulo) && !(p.c && p.c.letra)).map((p) => p.titulo);

      const desde = Date.now() - 5000;
      let idProyecto = "cancionero-" + uid(8);
      fs.enviar("create_project", { name: nombre, id: idProyecto });
      await espera(600);
      const proyectos = (await fs.pedir("get_projects")) || {};
      if (!proyectos[idProyecto]) {
        const igual = Object.entries(proyectos).filter(([, x]) => x && x.name === nombre && (x.created || 0) >= desde).sort((a, b) => b[1].created - a[1].created)[0];
        if (!igual) throw { code: "sin-proyecto" };
        idProyecto = igual[0];
      }
      for (let i = 0; i < nuevas.length; i++) {
        progreso(`Creando ${i + 1} de ${nuevas.length}: ${nuevas[i].titulo}`);
        fs.enviar("create_show", { name: nuevas[i].titulo, text: texto(nuevas[i].c, nuevas[i].pasos, conAcordes) });
        await espera(450);
      }
      // FreeShow pone cada presentación nueva en el proyecto abierto; se vacía y se arma en el orden del repertorio.
      progreso("Ordenando el proyecto");
      for (let intento = 0; intento < 6; intento++) {
        shows = await fs.pedir("get_shows");
        if (nuevas.every((p) => buscarShow(shows, p.titulo))) break;
        await espera(700);
      }
      const actual = await fs.pedir("get_project", { id: idProyecto });
      for (let i = ((actual && actual.shows) || []).length; i > 0; i--) { fs.enviar("remove_project_item", { id: idProyecto, index: 1 }); await espera(120); }
      let usadas = 0, creadas = 0;
      const faltan = [...sinLetra];
      for (const p of pasos) {
        if (p.tipo === "seccion") { fs.enviar("add_to_project", { projectId: idProyecto, id: uid(5), data: { type: "section", name: p.nombre } }); await espera(120); continue; }
        const id = buscarShow(shows, p.titulo);
        if (!id) { if (!faltan.includes(p.titulo)) faltan.push(p.titulo); continue; }
        if (nuevas.includes(p)) creadas++; else usadas++;
        fs.enviar("add_to_project", { projectId: idProyecto, id, data: { type: "show" } });
        await espera(120);
      }
      await espera(300);
      return { usadas, creadas, faltan };
    } finally { fs.cerrar(); }
  }

  global.FreeShow = { texto, proyecto, enviarRepertorio };
})(window);
