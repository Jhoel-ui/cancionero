---
title: Acordes Cancionero
emoji: 🎸
colorFrom: yellow
colorTo: gray
sdk: docker
app_port: 7860
pinned: false
---

# Analizador de acordes del Cancionero

Recibe un link de YouTube (o un archivo de audio) y devuelve los acordes con su tiempo, el tono y el tempo.
Usa los modelos ya entrenados de [madmom](https://github.com/CPJKU/madmom) (Universidad de Linz; uso sin fines de lucro).
No guarda audio. Solo atiende a quien entra al Cancionero con su cuenta (token de Firebase).

## Publicarlo gratis (una sola vez)
1. Crea una cuenta en https://huggingface.co (gratis, sin tarjeta).
2. New Space → nombre `acordes-cancionero`, SDK **Docker**, plantilla en blanco, hardware **CPU basic (free)**, público.
3. Sube los archivos de esta carpeta (`Dockerfile`, `README.md`, `requirements.txt`, `app.py`, `analizar.py`) en Files → Add file → Upload files.
4. Espera a que diga **Running** (la primera vez tarda unos 10 minutos).
5. La dirección queda como `https://<usuario>-acordes-cancionero.hf.space`. Ponla en `js/config.js` del Cancionero (`ANALIZADOR`).

## Variables (Settings → Variables and secrets), todas opcionales
- `FIREBASE_PROYECTO`: por defecto `cancionero-renovacion`.
- `ORIGENES`: páginas que pueden usarlo, por defecto `https://jhoel-ui.github.io`.
- `MAX_MINUTOS`: largo máximo del video, por defecto 12.
- `YT_COOKIES` (secreto): solo si YouTube empieza a responder "confirma que no eres un robot". Es el contenido de un `cookies.txt` de una cuenta de Google aparte (no la personal).

El Space gratis se duerme tras 48 horas sin uso; el primer pedido después lo despierta (tarda un minuto).

## Probar en la compu
```
pip install -r requirements.txt && pip install --no-build-isolation git+https://github.com/CPJKU/madmom
SIN_TOKEN=1 uvicorn app:app --port 8765
curl -F audio=@cancion.mp3 localhost:8765/analizar-audio
```
