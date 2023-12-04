import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config
export default defineConfig({
  plugins:[react()],
    build: {
        publicPath: '../',
        minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
        rollupOptions: {
            output: {
                external: ['axios', 'redux-thunk'],
                format: 'es', // o 'cjs' según tu preferencia
            },
        },
    },
    base: "./",
    server: {
        port: 6969,
    },
});
