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

## Publicarlo en Google Cloud Run (una sola vez)
Va en el mismo proyecto de Firebase (`cancionero-renovacion`), con el plan Blaze. El uso gratis de Cloud Run alcanza para unas 2000 canciones al mes.
1. Firebase → Uso y facturación → cambiar al plan **Blaze**, y en Google Cloud → Facturación → Presupuestos, una alerta de 1 USD.
2. https://console.cloud.google.com/run?project=cancionero-renovacion → **Implementar contenedor → Servicio** → **Implementar de forma continua desde un repositorio** → **Configurar con Cloud Build**: GitHub `Jhoel-ui/cancionero`, rama `^main$`, tipo **Dockerfile**, ubicación `/servidor-acordes/Dockerfile`.
3. Nombre `acordes-cancionero`, región `us-central1`, **Permitir acceso público** (la página igual exige el token de Firebase).
4. Contenedor: memoria **2 GiB**, CPU **2**, tiempo de espera **600** s, instancias mínimas **0**, máximas **2**. Crear.
5. La dirección queda `https://acordes-cancionero-497130298106.us-central1.run.app`, que ya está en `js/config.js`.

Cada cambio en `servidor-acordes/` que llegue a `main` se vuelve a publicar solo.

## Variables (Settings → Variables and secrets), todas opcionales
- `FIREBASE_PROYECTO`: por defecto `cancionero-renovacion`.
- `ORIGENES`: páginas que pueden usarlo, por defecto `https://jhoel-ui.github.io`.
- `MAX_MINUTOS`: largo máximo del video, por defecto 12.
- `YT_COOKIES` (secreto): solo si YouTube empieza a responder "confirma que no eres un robot". Es el contenido de un `cookies.txt` de una cuenta de Google aparte (no la personal).

Sin uso se apaga solo (no cobra); el primer pedido lo despierta en unos segundos.

## Probar en la compu
```
pip install -r requirements.txt && pip install --no-build-isolation git+https://github.com/CPJKU/madmom
SIN_TOKEN=1 uvicorn app:app --port 8765
curl -F audio=@cancion.mp3 localhost:8765/analizar-audio
```
