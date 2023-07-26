import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// define: {
	// 	global: 'hi',
	// 	process: { env: {} }
	// },
	optimizeDeps: {
		allowNodeBuiltins: ['pouchdb-browser', 'pouchdb-utils', 'base64id', 'mime-types']
	}
});
