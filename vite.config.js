import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue2()],
  test: { environment: 'node' },
  build: {
    outDir: './dist',
    lib: {
      entry: './src/index.js',
      formats: ['es', 'cjs']
    }
  }
})
