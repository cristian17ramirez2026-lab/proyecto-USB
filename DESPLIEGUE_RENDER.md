# Guía de Despliegue en Render (GRATIS)

## 📋 Requisitos Previos
1. Cuenta en GitHub
2. Cuenta en Render.com (gratis)
3. Tu código subido a GitHub

---

## 🚀 Pasos para Desplegar

### 1. Preparar el Repositorio

```bash
# Inicializar Git (si no lo has hecho)
git init
git add .
git commit -m "Preparar para despliegue"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

### 2. Configurar en Render.com

#### Opción A: Usando render.yaml (Automático)
1. Ve a [render.com](https://render.com) y crea una cuenta
2. Click en "New +" → "Blueprint"
3. Conecta tu repositorio de GitHub
4. Render detectará el archivo `render.yaml` automáticamente
5. Click en "Apply" y espera el despliegue

#### Opción B: Manual

**Backend (Django):**
1. En Render Dashboard → "New +" → "Web Service"
2. Conecta tu repositorio
3. Configuración:
   - **Name**: inventario-backend
   - **Root Directory**: backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
   - **Start Command**: `gunicorn config.wsgi:application`
4. Variables de entorno:
   - `PYTHON_VERSION`: 3.11.0
   - `DEBUG`: False
   - `ALLOWED_HOSTS`: *
5. Click "Create Web Service"

**Frontend (React):**
1. En Render Dashboard → "New +" → "Static Site"
2. Conecta tu repositorio
3. Configuración:
   - **Name**: inventario-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist
4. Click "Create Static Site"

---

## 🌐 Alternativas de Hosting Gratis

### **Vercel** (Solo Frontend)
```bash
cd frontend
npm i -g vercel
vercel
```

### **Netlify** (Solo Frontend)
```bash
cd frontend
npm run build
# Arrastra la carpeta 'dist' a netlify.com/drop
```

### **Railway** (Backend + Frontend)
1. Ve a [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Selecciona tu repositorio
4. Railway detecta automáticamente Django y React

### **PythonAnywhere** (Solo Backend)
1. Cuenta gratis en [pythonanywhere.com](https://pythonanywhere.com)
2. Sube tu código
3. Configura WSGI para Django

---

## 🔧 Configuración Adicional

### Actualizar URL del Backend en Frontend

Edita `frontend/src/services/apiService.js`:

```javascript
const API_URL = 'https://tu-backend.onrender.com/api';
```

### Configurar CORS en Django

En `backend/config/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://tu-frontend.onrender.com",
    "https://tu-dominio.com",
]
```

---

## 📱 Acceso desde Cualquier Dispositivo

Una vez desplegado, tendrás URLs como:
- **Frontend**: `https://inventario-frontend.onrender.com`
- **Backend**: `https://inventario-backend.onrender.com`

Puedes acceder desde:
- ✅ Cualquier computadora
- ✅ Celular
- ✅ Tablet
- ✅ Cualquier red WiFi o datos móviles

---

## 💡 Consejos

1. **Render Free Tier**: El servicio gratis se "duerme" después de 15 minutos de inactividad. La primera carga puede tardar 30-60 segundos.

2. **Base de Datos**: Para producción, considera usar:
   - PostgreSQL en Render (gratis)
   - Supabase (gratis)
   - MongoDB Atlas (gratis)

3. **Dominio Personalizado**: Puedes conectar tu propio dominio gratis en Render.

4. **HTTPS**: Render proporciona HTTPS automáticamente.

---

## 🆘 Solución de Problemas

### Error: "Application failed to start"
- Verifica que `requirements.txt` esté completo
- Revisa los logs en Render Dashboard

### Error: CORS
- Agrega la URL del frontend a `CORS_ALLOWED_ORIGINS` en Django

### Base de datos no funciona
- Render Free usa almacenamiento efímero
- Considera usar PostgreSQL de Render o base de datos externa

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Render Dashboard
2. Verifica las variables de entorno
3. Asegúrate de que el código funciona localmente primero
