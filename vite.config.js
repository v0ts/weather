import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	base: 'https://v0ts.github.io/weather/',
	plugins: [react()],
})
