import preact from "@preact/preset-vite"
import tailwind from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [tailwind(), preact()],
	server: {
		port: 3000,
		proxy: { "/gql": "http://localhost:4000" },
	},
})
