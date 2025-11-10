import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'modal-image',
      fileName: (format) => `modal-image.${format}.js`,
    },
    rollupOptions: {
      // Реактийг гадаад сан болгох хэрэгтэй. Ингэснээр хэрэглэгчид bundle хийхээс сэргийлнэ
      external: ['react', 'react-dom', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'lucide-react': 'LucideReact',
        },
      },
    },
  },
})
