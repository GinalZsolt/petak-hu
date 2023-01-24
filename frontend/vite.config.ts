import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve:{
    alias:{
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-icons': path.resolve(__dirname, 'node_modules/bootstrap-icons')
    }
  }
})
