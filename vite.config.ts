import preact from '@preact/preset-vite'
import tailwind from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsPaths(), tailwind(), preact()],
  server: {
    port: 3000,
    proxy: { '/gql': 'http://localhost:4000' },
  },
  preview: {
    port: 3000,
    proxy: { '/gql': 'http://localhost:4000' },
  },
})
