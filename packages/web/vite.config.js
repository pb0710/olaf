import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
	base: '',
	plugins: [tsconfigPaths(), react()],
	server: {},
	resolve: {
		alias: {
			'@editor': resolve(__dirname, 'editor-views'),
			'@ui': resolve(__dirname, 'ui-views')
		}
	}
})
