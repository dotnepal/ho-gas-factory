import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ssgPlugin } from 'vite-plugin-ssg'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    ssgPlugin({
      // Scan src/pages/ for components that export `ssgOptions`
      pages: 'src/pages/',
      // Disable dev middleware so Vite dev server serves the live React app
      devMiddleware: false,
      config: {
        // Output pre-rendered HTML alongside the regular Vite build
        outDir: 'dist',
        baseUrl: '',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
