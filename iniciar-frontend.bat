@echo off
REM ===============================================================
REM  Inicia el frontend React/Vite (SIGAE/InventPro) en modo LAN
REM  - Instala node_modules si faltan
REM  - Escucha en 0.0.0.0:3000 (host: true en vite.config.js)
REM ===============================================================
setlocal

cd /d "%~dp0frontend"

if not exist "node_modules\" (
    echo [SIGAE] Instalando dependencias de Node...
    call npm install
    if errorlevel 1 (
        echo [SIGAE] ERROR: fallo npm install. Verifica que Node.js este instalado.
        pause
        exit /b 1
    )
)

echo.
echo =============================================================
echo  IPs disponibles para abrir desde otros equipos:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do echo   http://%%a:3000
echo =============================================================
echo.

call npm run dev

endlocal
