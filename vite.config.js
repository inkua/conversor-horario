import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/conversor-horario/',
    build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            crear_reunion: resolve(__dirname, 'crear-reunion.html'),
          },
        },
    },
})