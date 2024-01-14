import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			components: path.resolve('./src/components'),
			lib: path.resolve('./src/lib'),
			views: path.resolve('./src/views')
		}
	}
});
