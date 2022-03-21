import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'process'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false
  },
  server: {
    port: Number(process.env.PORT) || 3030
  },
  plugins: [react()]
})
