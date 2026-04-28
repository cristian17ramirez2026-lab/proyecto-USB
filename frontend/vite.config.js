import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Redirige todas las rutas al index.html para que React Router funcione
    historyApiFallback: true,
  }
})
