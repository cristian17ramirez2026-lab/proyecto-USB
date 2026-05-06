@echo off
REM ===============================================================
REM  Inicia el backend Django (SIGAE/InventPro) en modo LAN
REM  - Crea venv si no existe
REM  - Instala dependencias si faltan
REM  - Aplica migraciones
REM  - Escucha en 0.0.0.0:8000 para que otros equipos accedan
REM ===============================================================
setlocal

cd /d "%~dp0backend"

if not exist "venv\" (
    echo [SIGAE] Creando entorno virtual...
    python -m venv venv
    if errorlevel 1 (
        echo [SIGAE] ERROR: no se pudo crear el venv. Verifica que Python este instalado.
        pause
        exit /b 1
    )
)

call venv\Scripts\activate.bat

echo [SIGAE] Instalando/actualizando dependencias...
python -m pip install --upgrade pip >nul
pip install -r requirements.txt

echo [SIGAE] Aplicando migraciones...
python manage.py migrate

echo.
echo =============================================================
echo  IPs disponibles para conectar desde otros equipos:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do echo   http://%%a:8000
echo =============================================================
echo.

python manage.py runserver 0.0.0.0:8000

endlocal
