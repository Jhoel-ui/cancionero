"""Servidor del analizador de acordes del Cancionero.

POST /analizar        JSON {"url": "https://youtube.com/..."}: baja solo el audio, lo analiza y lo borra.
POST /analizar-audio  formulario con el archivo en "audio" (mp3, m4a, wav...), por si YouTube no deja bajar.
  Hay que mandar el token de Firebase de quien está en la página (Authorization: Bearer ...),
  así solo lo usan quienes entran con su cuenta al Cancionero.
No guarda ningún audio: solo devuelve los acordes, el tono y el tempo.
"""
import os
import re
import tempfile
import threading
from collections import OrderedDict

import google.auth.transport.requests
from fastapi import FastAPI, File, Header, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2 import id_token
from starlette.concurrency import run_in_threadpool

import analizar

PROYECTO = os.environ.get("FIREBASE_PROYECTO", "cancionero-renovacion")
ORIGENES = os.environ.get("ORIGENES", "https://jhoel-ui.github.io").split(",")
MAX_MINUTOS = int(os.environ.get("MAX_MINUTOS", "12"))
MAX_MB = 40
COOKIES = os.environ.get("YT_COOKIES")  # contenido de un cookies.txt, solo si YouTube empieza a pedir "no soy un robot"

app = FastAPI(title="Acordes Cancionero")
app.add_middleware(CORSMiddleware, allow_origins=ORIGENES, allow_methods=["GET", "POST"], allow_headers=["Authorization", "Content-Type"])

_pedido_google = google.auth.transport.requests.Request()
_uno_a_la_vez = threading.Lock()  # el análisis usa todo el procesador; mejor uno tras otro
_memoria = OrderedDict()  # video -> resultado, para no analizar dos veces el mismo link


def _quien(autorizacion):
    if os.environ.get("SIN_TOKEN") == "1":  # solo para probar en la compu
        return "prueba"
    token = (autorizacion or "").removeprefix("Bearer ").strip()
    if not token:
        raise HTTPException(401, "Entra con tu cuenta en el Cancionero.")
    try:
        datos = id_token.verify_firebase_token(token, _pedido_google, audience=PROYECTO)
    except Exception:
        raise HTTPException(401, "Tu sesión venció. Vuelve a entrar al Cancionero.")
    return datos.get("email", "")


def _id_video(url):
    m = re.search(r"(?:v=|youtu\.be/|shorts/|embed/|live/)([\w-]{11})", url)
    return m.group(1) if m else None


def _bajar(url, carpeta):
    import yt_dlp

    opciones = {
        "format": "bestaudio[filesize<40M]/bestaudio/best[height<=360]",
        "outtmpl": os.path.join(carpeta, "audio.%(ext)s"),
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "match_filter": yt_dlp.utils.match_filter_func(f"duration <= {MAX_MINUTOS * 60}"),
    }
    if COOKIES:
        ruta = os.path.join(carpeta, "cookies.txt")
        with open(ruta, "w") as f:
            f.write(COOKIES)
        opciones["cookiefile"] = ruta
    try:
        with yt_dlp.YoutubeDL(opciones) as ydl:
            info = ydl.extract_info(url, download=True)
    except Exception as e:
        texto = str(e)
        if "Sign in" in texto or "bot" in texto:
            raise HTTPException(503, "YouTube no dejó bajar el audio esta vez. Sube el archivo de audio en su lugar.")
        raise HTTPException(422, "No pude abrir ese link. Revisa que sea un video de YouTube público.")
    if not info or info.get("duration", 0) > MAX_MINUTOS * 60:
        raise HTTPException(422, f"El video dura más de {MAX_MINUTOS} minutos.")
    archivos = [f for f in os.listdir(carpeta) if f.startswith("audio.")]
    if not archivos:
        raise HTTPException(422, "No pude bajar el audio de ese video.")
    return os.path.join(carpeta, archivos[0]), info.get("title", "")


def _analizar(ruta):
    with _uno_a_la_vez:
        try:
            return analizar.analizar(ruta)
        except Exception:
            raise HTTPException(422, "No pude leer ese audio.")


@app.get("/")
def estado():
    return {"ok": True, "modelo": analizar.MODELO}


@app.post("/analizar")
async def por_link(request: Request, authorization: str | None = Header(None)):
    _quien(authorization)
    try:
        url = str((await request.json()).get("url", "")).strip()
    except Exception:
        url = ""
    video = _id_video(url)
    if not video:
        raise HTTPException(422, "Pega un link de YouTube.")
    if video in _memoria:
        _memoria.move_to_end(video)
        return _memoria[video]
    with tempfile.TemporaryDirectory() as carpeta:
        ruta, titulo = await run_in_threadpool(_bajar, "https://www.youtube.com/watch?v=" + video, carpeta)
        resultado = await run_in_threadpool(_analizar, ruta)
    resultado.update(titulo=titulo, video=video)
    _memoria[video] = resultado
    while len(_memoria) > 200:
        _memoria.popitem(last=False)
    return resultado


@app.post("/analizar-audio")
async def por_archivo(audio: UploadFile = File(...), authorization: str | None = Header(None)):
    _quien(authorization)
    datos = await audio.read()
    if len(datos) > MAX_MB * 1024 * 1024:
        raise HTTPException(413, f"El archivo pasa de {MAX_MB} MB.")
    nombre, ext = os.path.splitext(audio.filename or "audio")
    with tempfile.TemporaryDirectory() as carpeta:
        ruta = os.path.join(carpeta, "subido" + ext[:6])
        with open(ruta, "wb") as f:
            f.write(datos)
        resultado = await run_in_threadpool(_analizar, ruta)
    resultado["titulo"] = nombre
    return resultado
