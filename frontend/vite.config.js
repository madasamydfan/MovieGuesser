import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    preview: {
    host: true,  // to listen on all interfaces
    allowedHosts: ['movie-guesser.up.railway.app'],  // add your Railway domain here
  }
})
