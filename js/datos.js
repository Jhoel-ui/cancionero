// Capa de datos: el mismo cancionero funciona con tres fuentes.
// Cada ministerio guarda lo suyo aparte: sus colecciones van con el prefijo de window.MINISTERIO
// (Renovación en la raíz; Renuevo en ministerios/renuevo/…).
//  - "firebase": la página web publicada (datos en tiempo real y sin señal).
//  - "claude": la vista previa en claude.ai.
//  - "local": modo de prueba, guarda solo en este teléfono.
(function (global) {
  "use strict";

  const FIREBASE_VERSION = "10.12.2";

  const M = () => global.MINISTERIO || { prefijo: "", dueno: "", id: "renovacion" };
  const ruta = (coleccion) => M().prefijo + coleccion;

  function nuevoId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  // ---------- Vista previa en claude.ai ----------
  async function fuenteClaude() {
    const c = global.claude;
    const [db, user, downloads] = await Promise.all([c.use("db"), c.use("user"), c.use("downloads")]);
    if (!db) return null;
    let editar = true, borrar = true;
    if (user) {
      try { const p = await user.can("data.write"); if (p === false) editar = false; } catch (_) {}
      try { borrar = (await user.canEdit()) !== false; } catch (_) {}
    }
    return {
      modo: "claude",
      permisos: { editar, borrar: editar && borrar },
      cuenta: null,
      escuchar(coleccion, cb, error) {
        return db.collection(ruta(coleccion)).onSnapshot((snap) => {
          const datos = {};
          snap.docs.forEach((d) => { datos[d.id] = d.data(); });
          cb(datos);
        }, error);
      },
      async guardar(coleccion, id, datos) {
        const ref = id ? db.doc(ruta(coleccion) + "/" + id) : db.collection(ruta(coleccion)).doc();
        await ref.set(datos);
        return ref.id;
      },
      borrar: (coleccion, id) => db.doc(ruta(coleccion) + "/" + id).delete(),
      async descargar(nombre, blob) {
        if (!downloads) throw { code: "unavailable" };
        await downloads.save({ filename: nombre, data: blob });
      },
    };
  }

  // ---------- Página web con Firebase ----------
  async function fuenteFirebase(config) {
    const base = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/`;
    const [{ initializeApp }, fs, au] = await Promise.all([
      import(base + "firebase-app.js"),
      import(base + "firebase-firestore.js"),
      import(base + "firebase-auth.js"),
    ]);
    const { dueno: _d, ...opciones } = config;
    const app = initializeApp(opciones);
    // Caché local: el cancionero se abre y se lee aunque no haya señal.
    const db = fs.initializeFirestore(app, {
      localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() }),
    });
    const auth = au.getAuth(app);
    const oyentes = new Set();
    const fuente = {
      modo: "firebase",
      permisos: { editar: false, borrar: false },
      cuenta: null,
      alCambiarCuenta(fn) { oyentes.add(fn); },
      escuchar(coleccion, cb, error) {
        return fs.onSnapshot(fs.collection(db, ruta(coleccion)), (snap) => {
          const datos = {};
          snap.docs.forEach((d) => { datos[d.id] = d.data(); });
          cb(datos);
        }, error);
      },
      async guardar(coleccion, id, datos) {
        const ref = id ? fs.doc(db, ruta(coleccion), id) : fs.doc(fs.collection(db, ruta(coleccion)));
        await fs.setDoc(ref, datos);
        return ref.id;
      },
      borrar: (coleccion, id) => fs.deleteDoc(fs.doc(db, ruta(coleccion), id)),
      async entrar() { await au.signInWithPopup(auth, new au.GoogleAuthProvider()); },
      async salir() { await au.signOut(auth); },
      async descargar(nombre, blob) { descargaNavegador(nombre, blob); },
    };
    const dueno = String(M().dueno || "").toLowerCase();
    fuente.equipo = { lideres: [], miembros: [] };
    fuente.guardarEquipo = async (eq) => { await fs.setDoc(fs.doc(db, ruta("config"), "equipo"), eq); fuente.equipo = eq; };
    au.onAuthStateChanged(auth, async (u) => {
      fuente.cuenta = u ? { nombre: u.displayName || u.email, correo: u.email } : null;
      fuente.permisos = { editar: false, borrar: false };
      if (u) {
        // Lista de miembros y líderes en config/equipo del ministerio: { miembros: [correos], lideres: [correos] }.
        // El dueño (ministerio.js) siempre es líder, así puede crear la lista desde la página.
        const correo = (u.email || "").toLowerCase();
        let eq = {};
        try { const snap = await fs.getDoc(fs.doc(db, ruta("config"), "equipo")); if (snap.exists()) eq = snap.data(); } catch (_) {}
        fuente.equipo = { lideres: eq.lideres || [], miembros: eq.miembros || [] };
        const en = (lista) => lista.map((x) => String(x).toLowerCase()).includes(correo);
        const lider = (dueno && correo === dueno) || en(fuente.equipo.lideres);
        fuente.permisos = { editar: lider || en(fuente.equipo.miembros), borrar: lider };
      }
      fuente.cuentaLista = true;
      oyentes.forEach((fn) => fn());
    });
    return fuente;
  }

  // ---------- Modo de prueba (solo este teléfono) ----------
  function fuenteLocal() {
    const CLAVE = "cancionero-" + M().id + "-prueba";
    let todo = {};
    try { todo = JSON.parse(localStorage.getItem(CLAVE) || "{}"); } catch (_) {}
    const oyentes = {};
    const avisar = (col) => (oyentes[col] || []).forEach((cb) => cb({ ...(todo[col] || {}) }));
    const persistir = () => { try { localStorage.setItem(CLAVE, JSON.stringify(todo)); } catch (_) {} };
    return {
      modo: "local",
      permisos: { editar: true, borrar: true },
      cuenta: null,
      escuchar(col, cb) {
        (oyentes[col] = oyentes[col] || []).push(cb);
        setTimeout(() => cb({ ...(todo[col] || {}) }), 0);
        return () => {};
      },
      async guardar(col, id, datos) {
        id = id || nuevoId();
        (todo[col] = todo[col] || {})[id] = datos;
        persistir(); avisar(col);
        return id;
      },
      async borrar(col, id) {
        if (todo[col]) delete todo[col][id];
        persistir(); avisar(col);
      },
      async descargar(nombre, blob) { descargaNavegador(nombre, blob); },
    };
  }

  function descargaNavegador(nombre, blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = nombre;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  async function conectar() {
    if (global.claude && typeof global.claude.use === "function") {
      try { const f = await fuenteClaude(); if (f) return f; } catch (_) {}
      return null;
    }
    const config = global.CONFIG_FIREBASE;
    if (config && config.apiKey) return fuenteFirebase(config);
    return fuenteLocal();
  }

  global.Datos = { conectar };
})(window);
