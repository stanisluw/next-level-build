import path from 'node:path';
import { type PluginOption, defineConfig } from 'vite';

import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

interface ViteConfigInput {
	mode: string;
	command: string;
}

export default (args: ViteConfigInput) => {
	const isDevMode = args.mode === 'development';

	const plugins: PluginOption[] = [
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		tailwindcss(),
	];

	const devPlugins = [
		checker({
			overlay: {
				initialIsOpen: 'error',
				position: 'tr',
				panelStyle: 'height: 100%; max-height: 100%; background-color: #32363f',
			},
			typescript: true,
			biome: {
				command: 'check',
				flags: '--apply',
				dev: {
					logLevel: ['error', 'warning'],
				},
			},
		}),
	];

	if (isDevMode) {
		plugins.push(...devPlugins);
	}

	return defineConfig({
		plugins,
		resolve: {
			alias: {
				'#app': path.resolve(__dirname, './src/app'),
				'#pages': path.resolve(__dirname, './src/pages'),
				'#widgets': path.resolve(__dirname, './src/widgets'),
				'#features': path.resolve(__dirname, './src/features'),
				'#entities': path.resolve(__dirname, './src/entities'),
				'#shared': path.resolve(__dirname, './src/shared'),
			},
		},
		server: {
			host: true,
		},
	});
};
