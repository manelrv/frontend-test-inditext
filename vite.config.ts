import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  console.log({ mode })
  return defineConfig({
    plugins: [react()],
    build: {
      minify: mode === 'production',
      cssMinify: mode === 'production'
    }
  })
}
