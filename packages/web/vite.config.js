import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { swcReactRefresh } from 'vite-plugin-swc-react-refresh'
import { resolve } from 'path'

export default defineConfig({
	base: '',
	plugins: [tsconfigPaths(), swcReactRefresh()],
	server: {},
	resolve: {
		alias: {
			'@editor': resolve(__dirname, 'editor-views'),
			'@ui': resolve(__dirname, 'ui-views')
		}
	}
})
