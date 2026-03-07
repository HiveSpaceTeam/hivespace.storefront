import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['vue', 'vue-router', 'pinia'],
  },
  optimizeDeps: {
    exclude: ['@hivespace/shared'],
  },
  server: {
    port: Number(process.env.VITE_DEV_PORT ?? process.env.PORT ?? 5174),
    watch: {
      ignored: ['!**/node_modules/@hivespace/shared/**'],
    },
  },
  preview: {
    port: Number(process.env.VITE_PREVIEW_PORT ?? process.env.PREVIEW_PORT ?? 5174),
  },
})
