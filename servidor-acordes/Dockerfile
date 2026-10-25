# Analizador de acordes del Cancionero. Pensado para un Space gratis de Hugging Face (Docker, puerto 7860).
FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg git build-essential curl unzip ca-certificates \
 && rm -rf /var/lib/apt/lists/*
# yt-dlp necesita un motor de JavaScript para los videos de YouTube.
RUN curl -fsSL https://deno.land/install.sh | DENO_INSTALL=/usr/local sh -s -- -y

RUN useradd -m -u 1000 usuario
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt setuptools wheel \
 && pip install --no-cache-dir --no-build-isolation "git+https://github.com/CPJKU/madmom@27f032e8947204902c675e5e341a3faf5dc86dae"
COPY --chown=usuario . .
USER usuario
# Carga los modelos una vez al armar la imagen, así el primer pedido no espera.
RUN python -c "import analizar"
EXPOSE 7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
