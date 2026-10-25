"""Saca acordes, tono y tempo de un audio con los modelos ya entrenados de madmom (Universidad de Linz).

Acordes: red convolucional + CRF (mayores y menores). Tono: red convolucional. Tempo y pulsos: red recurrente + DBN.
Los cambios de acorde se acomodan al pulso más cercano para que la línea de tiempo vaya a compás.
Pulsos y acordes se calculan a la vez (una canción de 3 minutos tarda cerca de 1 minuto).
"""
from concurrent.futures import ThreadPoolExecutor

import numpy as np
from madmom.audio.signal import Signal
from madmom.features.beats import DBNBeatTrackingProcessor, RNNBeatProcessor
from madmom.features.chords import CNNChordFeatureProcessor, CRFChordRecognitionProcessor
from madmom.features.key import CNNKeyRecognitionProcessor, key_prediction_to_label
from madmom.models import BEATS_BLSTM

MODELO = "madmom-cnn-crf-v1"

_acordes_rasgos = CNNChordFeatureProcessor()
_acordes_crf = CRFChordRecognitionProcessor()
_tono = CNNKeyRecognitionProcessor()
_pulso_rnn = RNNBeatProcessor(nn_files=BEATS_BLSTM[:2])  # 2 de las 8 redes: igual de bien para el BPM y 4 veces más rápido
_pulso_dbn = DBNBeatTrackingProcessor(fps=100, min_bpm=50, max_bpm=200)

# madmom escribe "A:min", "Bb:maj" (a veces con sostenidos); la página usa "Am", "Bb".
_SOSTENIDO_A_BEMOL = {"C#": "Db", "D#": "Eb", "F#": "F#", "G#": "Ab", "A#": "Bb"}


def nombre_acorde(etiqueta):
    if etiqueta in ("N", "X"):
        return ""
    raiz, _, tipo = etiqueta.partition(":")
    raiz = _SOSTENIDO_A_BEMOL.get(raiz, raiz)
    return raiz + ("m" if tipo.startswith("min") else "")


def nombre_tono(etiqueta):
    # "A minor" -> "Am", "Bb major" -> "Bb"
    raiz, _, modo = etiqueta.partition(" ")
    raiz = _SOSTENIDO_A_BEMOL.get(raiz, raiz)
    return raiz + ("m" if modo == "minor" else "")


_NOTAS = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
_PESO_GRADO = {(0, ""): 1.3, (5, ""): 1.0, (7, ""): 1.1, (9, "m"): 0.9, (2, "m"): 0.8, (4, "m"): 0.6}


def tono_por_acordes(segmentos):
    """Tono según los acordes: el que mejor explica cuánto suena cada acorde (I, IV, V, vi, ii, iii).
    En alabanza casi todo es diatónico, así que acierta más que escuchar el audio crudo."""
    sonando = [s for s in segmentos if s["acorde"]]
    if not sonando:
        return None
    def partes(a):
        m = a.endswith("m")
        return _NOTAS.index(a[:-1] if m else a), "m" if m else ""
    mejor, puntos_mejor = None, -1e9
    for k in range(12):
        puntos = 0.0
        for s in sonando:
            raiz, tipo = partes(s["acorde"])
            puntos += (s["fin"] - s["ini"]) * _PESO_GRADO.get(((raiz - k) % 12, tipo), -0.5)
        for s in (sonando[0], sonando[-1]):  # suele empezar y terminar en el tono
            if partes(s["acorde"]) == (k, ""):
                puntos += 4
        if puntos > puntos_mejor:
            mejor, puntos_mejor = k, puntos
    # Si empieza y termina en el vi, la canción está en el relativo menor.
    vi = ((mejor + 9) % 12, "m")
    if partes(sonando[0]["acorde"]) == vi and partes(sonando[-1]["acorde"]) == vi:
        return _NOTAS[vi[0]] + "m"
    return _NOTAS[mejor]


def _al_pulso(t, pulsos):
    if len(pulsos) == 0:
        return t
    i = int(np.argmin(np.abs(pulsos - t)))
    return float(pulsos[i]) if abs(pulsos[i] - t) < 0.35 else t


def analizar(ruta):
    senal = Signal(ruta, sample_rate=44100, num_channels=1)
    duracion = len(senal) / senal.sample_rate

    with ThreadPoolExecutor(2) as hilos:
        en_pulsos = hilos.submit(lambda: _pulso_dbn(_pulso_rnn(senal)))
        en_acordes = hilos.submit(lambda: _acordes_crf(_acordes_rasgos(senal)))
        pulsos, crudos = en_pulsos.result(), en_acordes.result()
    bpm = round(60.0 / float(np.median(np.diff(pulsos)))) if len(pulsos) > 2 else None

    segmentos = []
    for ini, fin, etiqueta in crudos:
        acorde = nombre_acorde(etiqueta)
        ini = _al_pulso(float(ini), pulsos)
        fin = _al_pulso(float(fin), pulsos)
        if fin - ini < 0.25:  # destellos de un instante: se suman al acorde anterior
            if segmentos:
                segmentos[-1]["fin"] = fin
            continue
        if segmentos and segmentos[-1]["acorde"] == acorde:
            segmentos[-1]["fin"] = fin
        else:
            segmentos.append({"ini": round(ini, 2), "fin": round(fin, 2), "acorde": acorde})
    for s in segmentos:
        s["fin"] = round(s["fin"], 2)

    tono = tono_por_acordes(segmentos) or nombre_tono(key_prediction_to_label(_tono(senal)))

    return {
        "modelo": MODELO,
        "duracion": round(duracion, 2),
        "tono": tono,
        "bpm": bpm,
        "pulsos": [round(float(p), 2) for p in pulsos],
        "acordes": segmentos,
    }
