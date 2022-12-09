import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { swcReactRefresh } from 'vite-plugin-swc-react-refresh'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import { resolve } from 'path'

export default defineConfig({
	base: '',
	plugins: [
		tsconfigPaths(),
		swcReactRefresh(),
		visualizer(),
		Unocss({
			presets: [
				presetAttributify({
					/* preset options */
				}),
				presetUno()
			],
			rules: [['m-1', { margin: '0.25rem' }]]
		})
	],
	server: {},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	}
})
