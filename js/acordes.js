// Acordes: lectura del formato [G], conversión desde "acordes arriba", transposición.
(function (global) {
  "use strict";

  const RE_ACORDE = /^[A-G][#b]?(?:maj|min|dim|aug|sus|add|m|M|\d|\+|-|°|ø|\(|\))*(?:\/[A-G][#b]?)?$/;
  const RE_SECCION = /^\s*\[?\s*(intro|verso|estrofa|coro|pre-?coro|precoro|puente|final|outro|interludio|instrumental|solo|tag|vamp)\b[^\]\[]*\]?\s*:?\s*$/i;
  const esAcorde = (t) => RE_ACORDE.test(String(t).trim());

  // Parte una línea en segmentos {acorde, texto}
  function segmentos(linea) {
    const segs = [];
    const re = /\[([^\]]+)\]/g;
    let ultimo = 0, m, actual = { acorde: "", texto: "" };
    while ((m = re.exec(linea))) {
      if (!esAcorde(m[1])) continue;
      actual.texto += linea.slice(ultimo, m.index);
      if (actual.acorde || actual.texto) segs.push(actual);
      actual = { acorde: m[1].trim(), texto: "" };
      ultimo = re.lastIndex;
    }
    actual.texto += linea.slice(ultimo);
    if (actual.acorde || actual.texto) segs.push(actual);
    return segs;
  }

  const esSeccion = (linea) => RE_SECCION.test(linea) && !segmentos(linea).some((s) => s.acorde);
  const nombreSeccion = (linea) => linea.replace(/[\[\]:]/g, "").trim();

  // Convierte "acordes arriba, letra abajo" (formato de las páginas de acordes) a corchetes.
  function convertirAcordesArriba(texto) {
    const lineas = texto.replace(/\r/g, "").split("\n");
    const fuera = [];
    const esLineaAcordes = (l) => {
      const t = l.trim().split(/\s+/).filter(Boolean);
      return t.length > 0 && t.every(esAcorde) && !l.includes("[");
    };
    for (let i = 0; i < lineas.length; i++) {
      const l = lineas[i];
      if (!esLineaAcordes(l)) { fuera.push(l); continue; }
      const acordes = [];
      const re = /\S+/g;
      let m;
      while ((m = re.exec(l))) acordes.push({ col: m.index, ch: m[0] });
      const sig = lineas[i + 1];
      if (sig !== undefined && sig.trim() && !esLineaAcordes(sig) && !RE_SECCION.test(sig)) {
        const ultimaCol = acordes[acordes.length - 1].col;
        let letra = sig.length < ultimaCol ? sig.padEnd(ultimaCol, " ") : sig;
        for (let k = acordes.length - 1; k >= 0; k--) {
          letra = letra.slice(0, acordes[k].col) + `[${acordes[k].ch}]` + letra.slice(acordes[k].col);
        }
        fuera.push(letra.replace(/\s+$/, ""));
        i++;
      } else {
        fuera.push(acordes.map((a) => `[${a.ch}]`).join(" "));
      }
    }
    return fuera.join("\n");
  }

  const NOTAS_S = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const NOTAS_B = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  const indiceNota = (n) => { const i = NOTAS_S.indexOf(n); return i >= 0 ? i : NOTAS_B.indexOf(n); };

  function usaBemoles(tono) {
    const m = /^([A-G][#b]?)(m(?!aj))?/.exec(tono || "");
    if (!m) return false;
    let i = indiceNota(m[1]);
    if (i < 0) return false;
    if (m[2]) i = (i + 3) % 12;
    return [5, 10, 3, 8, 1, 6].includes(i);
  }
  function transponerNota(n, pasos, bemoles) {
    const i = indiceNota(n);
    return i < 0 ? n : (bemoles ? NOTAS_B : NOTAS_S)[(i + pasos + 120) % 12];
  }
  function transponerAcorde(ac, pasos, bemoles) {
    if (!pasos) return ac;
    return ac
      .replace(/^([A-G][#b]?)/, (n) => transponerNota(n, pasos, bemoles))
      .replace(/\/([A-G][#b]?)/, (_, n) => "/" + transponerNota(n, pasos, bemoles));
  }
  // Tono escrito, o el primer acorde de la letra
  function tonoDe(c) {
    if (c.tono && c.tono.trim()) return c.tono.trim();
    const m = /\[([^\]]+)\]/.exec(c.letra || "");
    if (!m || !esAcorde(m[1])) return "";
    return m[1].replace(/\/.*/, "").replace(/(maj|sus|add|dim|aug|\d|\+|\(|\)).*$/, "");
  }
  function tonoTranspuesto(c, pasos) {
    const t = tonoDe(c);
    if (!t) return "";
    return transponerAcorde(t, pasos, usaBemoles(transponerAcorde(t, pasos, false)));
  }
  // Posición del tono en el círculo de quintas (0 = C), para el color de la franja
  function quinta(tono) {
    const m = /^([A-G][#b]?)/.exec(tono || "");
    if (!m) return -1;
    const i = indiceNota(m[1]);
    return i < 0 ? -1 : (i * 7) % 12;
  }

  // Línea de acordes + línea de letra en ancho fijo (para el PDF)
  function lineasMonoespacio(linea, pasos, bem) {
    const segs = segmentos(linea);
    if (!segs.some((s) => s.acorde)) return { acordes: null, letra: linea };
    let a = "", l = "";
    for (const s of segs) {
      if (s.acorde) {
        if (a.length > l.length) l = l.padEnd(a.length, " ");
        a = a.padEnd(l.length, " ") + transponerAcorde(s.acorde, pasos, bem) + " ";
      }
      l += s.texto;
    }
    return { acordes: a.replace(/\s+$/, ""), letra: l.replace(/\s+$/, "") };
  }

  global.Acordes = {
    esAcorde, segmentos, esSeccion, nombreSeccion, convertirAcordesArriba,
    usaBemoles, transponerAcorde, tonoDe, tonoTranspuesto, quinta, lineasMonoespacio,
  };
})(window);
