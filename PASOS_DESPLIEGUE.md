# 🚀 Guía Paso a Paso para Desplegar tu Aplicación

## ✅ Archivos Preparados

Ya he creado todos los archivos necesarios:
- ✅ `backend/requirements.txt` - Dependencias actualizadas
- ✅ `backend/build.sh` - Script de construcción
- ✅ `render.yaml` - Configuración automática
- ✅ `frontend/.env.example` - Variables de entorno

---

## 📋 PASO 1: Subir a GitHub

```bash
# 1. Inicializar Git (si no lo has hecho)
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit
git commit -m "Preparar para despliegue en Vercel y Render"

# 4. Crear repositorio en GitHub
# Ve a github.com → New repository → Crea "inventario-sistema"

# 5. Conectar y subir
git remote add origin https://github.com/TU_USUARIO/inventario-sistema.git
git branch -M main
git push -u origin main
```

---

## 🖥️ PASO 2: Desplegar Backend en Render (GRATIS)

### 2.1 Crear Cuenta
1. Ve a [render.com](https://render.com)
2. Click en "Get Started for Free"
3. Regístrate con GitHub

### 2.2 Crear Web Service
1. En el Dashboard, click "New +" → "Web Service"
2. Click "Connect a repository"
3. Autoriza Render a acceder a GitHub
4. Selecciona tu repositorio `inventario-sistema`

### 2.3 Configurar el Servicio
```
Name: inventario-backend
Region: Oregon (US West) o el más cercano
Branch: main
Root Directory: backend
Runtime: Python 3
Build Command: ./build.sh
Start Command: gunicorn config.wsgi:application
Instance Type: Free
```

### 2.4 Variables de Entorno
Click en "Advanced" → "Add Environment Variable":
```
PYTHON_VERSION = 3.11.0
DEBUG = False
ALLOWED_HOSTS = *
SECRET_KEY = (genera uno aleatorio o deja que Render lo genere)
```

### 2.5 Desplegar
1. Click "Create Web Service"
2. Espera 5-10 minutos mientras se despliega
3. Copia la URL que te da (ej: `https://inventario-backend.onrender.com`)

---

## 🌐 PASO 3: Desplegar Frontend en Vercel (GRATIS)

### Opción A: Desde la Terminal (Recomendado)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Ir a la carpeta frontend
cd frontend

# 3. Crear archivo .env con la URL del backend
echo "VITE_API_URL=https://inventario-backend.onrender.com/api" > .env

# 4. Desplegar
vercel

# Responde las preguntas:
# - Set up and deploy? → Yes
# - Which scope? → (tu cuenta)
# - Link to existing project? → No
# - What's your project's name? → inventario-frontend
# - In which directory is your code located? → ./
# - Want to override the settings? → No

# 5. Desplegar a producción
vercel --prod
```

### Opción B: Desde la Web

1. Ve a [vercel.com](https://vercel.com)
2. Click "Sign Up" con GitHub
3. Click "Add New..." → "Project"
4. Selecciona tu repositorio
5. Configuración:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```
6. En "Environment Variables" agrega:
   ```
   VITE_API_URL = https://inventario-backend.onrender.com/api
   ```
7. Click "Deploy"
8. Espera 2-3 minutos

---

## 🔗 PASO 4: Conectar Frontend con Backend

### 4.1 Actualizar CORS en Backend

1. Ve a Render Dashboard → Tu servicio backend
2. "Environment" → Agrega:
   ```
   CORS_ALLOWED_ORIGINS = https://tu-proyecto.vercel.app
   ```
3. Click "Save Changes"
4. El servicio se reiniciará automáticamente

### 4.2 Verificar Conexión

1. Abre tu app en Vercel: `https://tu-proyecto.vercel.app`
2. Intenta hacer login
3. Si funciona, ¡listo! 🎉

---

## 📱 PASO 5: Probar desde Cualquier Dispositivo

Ahora puedes acceder desde:
- ✅ Tu computadora
- ✅ Celular (Android/iOS)
- ✅ Tablet
- ✅ Cualquier red WiFi
- ✅ Datos móviles

Solo abre: `https://tu-proyecto.vercel.app`

---

## 🆘 Solución de Problemas Comunes

### ❌ Error: "Build failed" en Render
**Solución:**
```bash
# Verifica que build.sh tenga permisos
chmod +x backend/build.sh
git add backend/build.sh
git commit -m "Agregar permisos a build.sh"
git push
```

### ❌ Error: "CORS policy" en el navegador
**Solución:**
1. Ve a Render → Environment
2. Agrega la URL de Vercel a `CORS_ALLOWED_ORIGINS`
3. Guarda y espera que se reinicie

### ❌ Error: "Cannot connect to backend"
**Solución:**
1. Verifica que la URL del backend en Vercel sea correcta
2. Ve a Vercel → Settings → Environment Variables
3. Verifica que `VITE_API_URL` tenga la URL correcta
4. Redeploy: `vercel --prod`

### ❌ Backend se "duerme" (Render Free)
**Nota:** El plan gratis de Render duerme el servicio después de 15 minutos sin uso.
- Primera carga: 30-60 segundos
- Después: Normal

**Solución (opcional):**
- Usa un servicio de "ping" como [UptimeRobot](https://uptimerobot.com) (gratis)
- O actualiza a plan de pago ($7/mes)

---

## 💡 Consejos Adicionales

### Dominio Personalizado (Opcional)
1. Compra un dominio en Namecheap, GoDaddy, etc.
2. En Vercel: Settings → Domains → Add
3. Configura DNS según instrucciones
4. ¡Tu app en tu propio dominio!

### Base de Datos Persistente (Opcional)
El SQLite actual se borra cada vez que Render reinicia.

**Solución:**
1. Render → New → PostgreSQL (gratis)
2. Copia la URL de conexión
3. Actualiza `settings.py` para usar PostgreSQL
4. Agrega `psycopg2-binary` a `requirements.txt`

### Monitoreo
- **Vercel**: Analytics gratis en el dashboard
- **Render**: Logs en tiempo real en el dashboard

---

## 🎯 URLs Finales

Después del despliegue tendrás:
- **Frontend**: `https://inventario-frontend.vercel.app`
- **Backend**: `https://inventario-backend.onrender.com`

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa los logs en Render/Vercel Dashboard
2. Verifica que funcione localmente primero
3. Revisa las variables de entorno

---

## ✨ ¡Felicidades!

Tu aplicación ahora está en la nube y accesible desde cualquier lugar del mundo. 🌍

**Próximos pasos:**
- Comparte la URL con tu equipo
- Configura un dominio personalizado
- Agrega más funcionalidades
- ¡Disfruta tu app en producción!
