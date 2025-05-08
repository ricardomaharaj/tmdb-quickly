import preact from '@preact/preset-vite'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsPaths(), tailwind(), preact()],
  server: { port: Number(process.env.PORT || 3000) },
  preview: { port: Number(process.env.PORT || 3000) },
})
