import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      manifestFilename: 'manifest.json',
      manifest: {
        name: 'TMDB Quickly',
        short_name: 'TMDB Quickly',
        description: 'a React TMDB client designed for speed',
        icons: [
          {
            src: '/icon-16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: '/icon-32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '.',
        theme_color: '#1e293b',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
      },
    }),
  ],
  server: { port: 3000 },
  preview: { port: 3000 },
})
