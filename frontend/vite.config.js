import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // host: true expone el servidor en todas las interfaces de red (0.0.0.0)
    // para que otros equipos de la LAN puedan acceder vía la IP del host.
    host: true,
    port: 3000,
    strictPort: true,
    // Redirige todas las rutas al index.html para que React Router funcione
    historyApiFallback: true,
  }
})
