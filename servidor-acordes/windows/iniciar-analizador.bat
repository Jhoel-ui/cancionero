@echo off
rem Analizador de acordes del Cancionero en esta PC. Mientras esta ventana este abierta, "Sacar acordes" funciona.
rem Cierra la ventana para apagarlo.
title Analizador de acordes - Cancionero
cd /d "%~dp0.."
set /p DOMINIO=<"%~dp0dominio-ngrok.txt"
start "Tunel ngrok" /min ngrok http --url=%DOMINIO% 8765
echo.
echo  Analizador encendido en https://%DOMINIO%
echo  No cierres esta ventana mientras quieran sacar acordes.
echo.
".venv\Scripts\python.exe" -m uvicorn app:app --host 127.0.0.1 --port 8765
taskkill /im ngrok.exe /f >nul 2>&1
