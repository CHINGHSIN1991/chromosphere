import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const chromosphereReactSrc = path.resolve(__dirname, '../../packages/react/src')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@chromosphere/react/collapsible': path.join(chromosphereReactSrc, 'components/collapsible/index.ts'),
      '@chromosphere/react': path.join(chromosphereReactSrc, 'index.ts'),
    },
  },
})
