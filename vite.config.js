import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	server: {
		headers: {
			'Content-Type': 'application/javascript',
		},
	},
	plugins: [react()],
})
