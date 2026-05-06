# 🚀 DESPLIEGUE RÁPIDO - Sigue estos pasos exactos

## ✅ Tu código ya está en GitHub
- Repositorio: https://github.com/cristian17ramirez2026-lab/proyecto-USB
- ✅ Todos los archivos están listos

---

## 🖥️ PASO 1: Backend en Render (5 minutos)

### 1.1 Abrir Render
1. Abre tu navegador
2. Ve a: **https://render.com**
3. Click en **"Get Started for Free"**
4. Click en **"Sign up with GitHub"**
5. Autoriza Render

### 1.2 Crear Web Service
1. En el Dashboard, click en **"New +"** (botón azul arriba)
2. Click en **"Web Service"**
3. Busca y selecciona: **proyecto-USB**
4. Click en **"Connect"**

### 1.3 Configurar (copia y pega exactamente)
```
Name: gestion-inventario-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: ./build.sh
Start Command: gunicorn config.wsgi:application
Instance Type: Free
```

### 1.4 Variables de Entorno
1. Click en **"Advanced"**
2. Click en **"Add Environment Variable"**
3. Agrega estas 3 variables:

```
Variable 1:
Key: PYTHON_VERSION
Value: 3.11.0

Variable 2:
Key: DEBUG
Value: False

Variable 3:
Key: ALLOWED_HOSTS
Value: *
```

### 1.5 Desplegar
1. Click en **"Create Web Service"** (botón azul abajo)
2. Espera 5-10 minutos (verás logs en pantalla)
3. Cuando veas **"Live"** en verde, está listo
4. **COPIA LA URL** que aparece arriba (ejemplo: `https://gestion-inventario-backend-xxxx.onrender.com`)

---

## 🌐 PASO 2: Frontend en Vercel (3 minutos)

### 2.1 Abrir Vercel
1. Abre una nueva pestaña
2. Ve a: **https://vercel.com**
3. Click en **"Sign Up"**
4. Click en **"Continue with GitHub"**
5. Autoriza Vercel

### 2.2 Importar Proyecto
1. Click en **"Add New..."** → **"Project"**
2. Busca: **proyecto-USB**
3. Click en **"Import"**

### 2.3 Configurar (copia exactamente)
```
Project Name: gestion-inventario-frontend
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2.4 Variable de Entorno (IMPORTANTE)
1. Antes de hacer deploy, click en **"Environment Variables"**
2. Agrega esta variable:

```
Key: VITE_API_URL
Value: [PEGA AQUÍ LA URL DE RENDER]/api

Ejemplo: https://gestion-inventario-backend-xxxx.onrender.com/api
```

**⚠️ IMPORTANTE:** Reemplaza `[PEGA AQUÍ LA URL DE RENDER]` con la URL que copiaste en el Paso 1.5

### 2.5 Desplegar
1. Click en **"Deploy"**
2. Espera 2-3 minutos
3. Cuando termine, verás **"Congratulations!"**
4. Click en **"Visit"** para ver tu aplicación

---

## 🔗 PASO 3: Conectar Frontend con Backend (IMPORTANTE)

### 3.1 Actualizar CORS en Render
1. Vuelve a Render (https://dashboard.render.com)
2. Click en tu servicio **gestion-inventario-backend**
3. Ve a **"Environment"** (menú izquierdo)
4. Click en **"Add Environment Variable"**
5. Agrega:

```
Key: CORS_ALLOWED_ORIGINS
Value: https://proyecto-usb-cristian17ramirez2026-labs-projects.vercel.app

(Copia exactamente la URL de tu frontend en Vercel)
```

6. Click en **"Save Changes"**
7. El servicio se reiniciará automáticamente (1-2 minutos)

**⚠️ MUY IMPORTANTE:** Sin este paso, el frontend NO podrá comunicarse con el backend y verás errores de CORS.

---

## 🎉 ¡LISTO! Tu aplicación está en línea

### URLs finales:
- **Frontend**: `https://gestion-inventario-frontend.vercel.app`
- **Backend**: `https://gestion-inventario-backend-xxxx.onrender.com`

### Prueba tu aplicación:
1. Abre la URL del frontend en tu navegador
2. Intenta hacer login
3. Si funciona, ¡felicidades! 🎊

### Comparte con tu equipo:
- Envía la URL del frontend a quien quieras
- Funciona en cualquier dispositivo (PC, celular, tablet)
- Funciona en cualquier red (WiFi, datos móviles)

---

## 🆘 Si algo no funciona

### Error: "Cannot connect to backend"
**Solución:**
1. Ve a Vercel → Tu proyecto → Settings → Environment Variables
2. Verifica que `VITE_API_URL` tenga la URL correcta del backend
3. Click en los 3 puntos → Edit
4. Corrige la URL
5. Ve a Deployments → Click en los 3 puntos del último deploy → Redeploy

### Error: "CORS policy"
**Solución:**
1. Ve a Render → Tu servicio → Environment
2. Verifica que `CORS_ALLOWED_ORIGINS` tenga la URL correcta de Vercel
3. Edita si es necesario
4. Guarda (se reiniciará automáticamente)

### Backend muy lento (primera carga)
**Esto es normal:** El plan gratis de Render "duerme" el servicio después de 15 minutos sin uso.
- Primera carga: 30-60 segundos
- Después: Normal

---

## 📱 Acceso desde cualquier lugar

Ahora puedes acceder desde:
- ✅ Tu computadora
- ✅ Celular (Android/iOS)
- ✅ Tablet
- ✅ Casa de un amigo
- ✅ Universidad
- ✅ Trabajo
- ✅ Cualquier lugar con internet

Solo necesitas la URL: `https://gestion-inventario-frontend.vercel.app`

---

## 💡 Próximos pasos (opcional)

### Dominio personalizado
1. Compra un dominio (ej: miempresa.com)
2. En Vercel: Settings → Domains → Add
3. Sigue las instrucciones

### Base de datos persistente
1. Render → New → PostgreSQL (gratis)
2. Conecta a tu backend

### Monitoreo
- Vercel: Analytics automático
- Render: Logs en tiempo real

---

## ✨ ¡Felicidades!

Tu aplicación de gestión de inventario ahora está en la nube y accesible desde cualquier lugar del mundo. 🌍

**Tiempo total:** 10-15 minutos
**Costo:** $0 (100% gratis)
