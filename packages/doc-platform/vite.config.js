import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { swcReactRefresh } from 'vite-plugin-swc-react-refresh'
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { resolve } from 'path'

export default defineConfig({
	base: '',
	plugins: [
		tsconfigPaths(),
		swcReactRefresh(),
		visualizer(),
		Unocss({
			presets: [presetUno(), presetRemToPx()],
			rules: []
		})
	],
	server: {},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	}
})
