# Despliegue local en red (LAN) — SIGAE / InventPro

Guía rápida para que varios equipos de la misma red accedan al sistema desde el navegador.

## 1. Requisitos en el equipo servidor (una sola vez)

- **Python 3.10+** con `python` en el PATH. https://www.python.org/downloads/
- **Node.js 18+** con `npm`. https://nodejs.org/

Verifica en una terminal:

```bash
python --version
node --version
npm --version
```

## 2. Arranque rápido

En el equipo que actuará como servidor, haz doble clic (o ejecuta desde cmd) los dos `.bat` que están en la raíz del proyecto:

1. `iniciar-backend.bat`  → crea venv, instala dependencias, migra y arranca Django en `0.0.0.0:8000`.
2. `iniciar-frontend.bat` → instala `node_modules` si hacen falta y arranca Vite en `0.0.0.0:3000`.

Cada script imprime las IPs disponibles del equipo. Toma nota de la IP LAN (normalmente `192.168.x.x`).

## 3. Acceso desde otros equipos

Desde cualquier PC de la misma red abre en el navegador:

```
http://<IP_DEL_SERVIDOR>:3000
```

El frontend detecta automáticamente el host y llama al backend en `http://<IP_DEL_SERVIDOR>:8000/api/`, por lo que no hace falta tocar el código.

Si quieres fijar la URL del backend manualmente, crea `frontend/.env` copiando `frontend/.env.example` y define:

```
VITE_API_URL=http://192.168.1.100:8000/api/
```

Reinicia el frontend después de cambiar el `.env`.

## 4. Firewall de Windows

La primera vez que arranques los servidores, Windows pedirá permitir el acceso. Marca **Redes privadas** y acepta para `python.exe` y `node.exe`.

Si ya lo bloqueaste, en PowerShell como administrador:

```powershell
New-NetFirewallRule -DisplayName "SIGAE Backend 8000" -Direction Inbound -LocalPort 8000 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "SIGAE Frontend 3000" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

## 5. Crear el superusuario (primera vez)

Con el backend detenido o en otra terminal, dentro de `backend/` con el venv activado:

```bash
python manage.py createsuperuser
```

## 6. Detener los servidores

`Ctrl + C` en cada terminal. Cierra la ventana después.

## 7. Solución de problemas

- **"No se pudo conectar" desde otro equipo**: verifica la IP, ping al servidor, y que el firewall permita los puertos 3000 y 8000.
- **CORS bloqueado**: en `backend/config/settings.py`, mientras `DEBUG=True`, CORS está abierto. Si cambiaste DEBUG, añade el origen a `CORS_ALLOWED_ORIGINS`.
- **Puerto ocupado**: cambia el puerto editando `vite.config.js` (frontend) o el argumento del `runserver` en `iniciar-backend.bat`.
- **Cambios en `.env` no se ven**: Vite solo lee el `.env` al arrancar; reinicia `iniciar-frontend.bat`.
