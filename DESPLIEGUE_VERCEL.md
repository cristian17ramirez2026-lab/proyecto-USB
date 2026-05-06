# Guía de Despliegue en Vercel (GRATIS)

## 🚀 Despliegue del Frontend en Vercel

### Opción 1: Desde la Terminal (Más Rápido)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Ir a la carpeta del frontend
cd frontend

# 3. Desplegar
vercel

# Sigue las instrucciones:
# - Set up and deploy? Yes
# - Which scope? (tu cuenta)
# - Link to existing project? No
# - What's your project's name? inventario-frontend
# - In which directory is your code located? ./
# - Want to override the settings? No

# 4. Para producción
vercel --prod
```

### Opción 2: Desde la Web (Más Visual)

1. **Sube tu código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Preparar para Vercel"
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

2. **Ve a Vercel**
   - Entra a [vercel.com](https://vercel.com)
   - Click en "Sign Up" (con GitHub)
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio
   - Configuración:
     - **Framework Preset**: Vite
     - **Root Directory**: frontend
     - **Build Command**: `npm run build`
     - **Output Directory**: dist
   - Click "Deploy"

3. **¡Listo!** En 2-3 minutos tendrás tu URL:
   - `https://tu-proyecto.vercel.app`

---

## 🔧 Configurar Variables de Entorno

En Vercel Dashboard:
1. Ve a tu proyecto
2. "Settings" → "Environment Variables"
3. Agrega:
   - `VITE_API_URL`: URL de tu backend (ej: `https://tu-backend.onrender.com`)

---

## 🖥️ Despliegue del Backend (Opciones Gratis)

### Opción A: **Render** (Recomendado)
```bash
# 1. Ve a render.com
# 2. New + → Web Service
# 3. Conecta tu repo
# 4. Root Directory: backend
# 5. Build: pip install -r requirements.txt && python manage.py migrate
# 6. Start: gunicorn config.wsgi:application
```

### Opción B: **Railway**
```bash
# 1. Ve a railway.app
# 2. New Project → Deploy from GitHub
# 3. Selecciona tu repo
# 4. Railway detecta Django automáticamente
```

### Opción C: **PythonAnywhere**
```bash
# 1. Cuenta gratis en pythonanywhere.com
# 2. Sube tu código
# 3. Configura WSGI
```

---

## 🔗 Conectar Frontend con Backend

### 1. Actualizar URL del API en Frontend

Edita `frontend/src/services/apiService.js`:

```javascript
// Antes (local)
const API_URL = 'http://localhost:8000/api';

// Después (producción)
const API_URL = import.meta.env.VITE_API_URL || 'https://tu-backend.onrender.com/api';
```

### 2. Crear archivo `.env` en frontend

```bash
# frontend/.env
VITE_API_URL=https://tu-backend.onrender.com/api
```

### 3. Configurar CORS en Backend

En `backend/config/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://tu-proyecto.vercel.app",
    "http://localhost:3000",  # Para desarrollo local
]

# O permitir todos (solo para pruebas)
CORS_ALLOW_ALL_ORIGINS = True
```

---

## 📱 Resultado Final

Tendrás dos URLs:
- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend**: `https://tu-backend.onrender.com`

Accesible desde:
- ✅ Cualquier computadora
- ✅ Celular (Android/iOS)
- ✅ Tablet
- ✅ Cualquier red WiFi
- ✅ Datos móviles

---

## 🎁 Ventajas de Vercel

1. **Súper rápido**: CDN global
2. **Actualizaciones automáticas**: Cada push a GitHub despliega automáticamente
3. **Preview deployments**: Cada PR tiene su propia URL de prueba
4. **Analytics gratis**: Estadísticas de visitas
5. **Dominio personalizado**: Puedes conectar tu propio dominio

---

## 💰 Comparación de Planes

| Servicio | Frontend | Backend | Gratis | Límites |
|----------|----------|---------|--------|---------|
| **Vercel** | ✅ | ❌ | ✅ | 100GB/mes |
| **Render** | ✅ | ✅ | ✅ | Se duerme después de 15 min |
| **Railway** | ✅ | ✅ | ✅ | 500 horas/mes |
| **Netlify** | ✅ | ❌ | ✅ | 100GB/mes |

---

## 🆘 Solución de Problemas

### Error: "Build failed"
```bash
# Verifica que el build funcione localmente
cd frontend
npm install
npm run build
```

### Error: "API not connecting"
- Verifica la URL del backend en `.env`
- Revisa CORS en Django
- Verifica que el backend esté corriendo

### Error: "Environment variables not working"
- En Vercel, ve a Settings → Environment Variables
- Agrega `VITE_API_URL`
- Redeploy el proyecto

---

## 🔄 Actualizar la Aplicación

```bash
# Hacer cambios en tu código
git add .
git commit -m "Actualización"
git push

# Vercel despliega automáticamente en 1-2 minutos
```

---

## 📞 Comandos Útiles

```bash
# Ver logs
vercel logs

# Ver lista de despliegues
vercel ls

# Eliminar proyecto
vercel remove

# Ver dominio
vercel domains ls
```

---

## ✨ Bonus: Dominio Personalizado

1. En Vercel Dashboard → Settings → Domains
2. Agrega tu dominio (ej: `miapp.com`)
3. Configura DNS según las instrucciones
4. ¡Listo! Tu app en tu propio dominio

---

## 🎯 Recomendación Final

**Para tu proyecto:**
- ✅ **Frontend**: Vercel (gratis, rápido, fácil)
- ✅ **Backend**: Render (gratis, soporta Django)

Ambos son 100% gratis y funcionan perfectamente juntos.
