import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default () => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(null, process.cwd()) }
  console.log({ env: process.env.VITE_MODE !== 'DEVELOPMENT' })
  return defineConfig({
    plugins: [react()],
    build: {
      minify: process.env.VITE_MODE === 'PRODUCTION',
      cssMinify: process.env.VITE_MODE === 'PRODUCTION'
    }
  })
}
