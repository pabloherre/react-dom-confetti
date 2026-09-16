import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  publicDir: mode === 'library' ? false : 'public',
  build: mode === 'library'
    ? {
        lib: {
          entry: 'src/index.jsx',
          name: 'ReactDomConfetti',
          fileName: 'react-dom-confetti',
          formats: ['es', 'cjs'],
        },
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
        },
      }
    : {
        outDir: 'dist-demo',
      },
}));
