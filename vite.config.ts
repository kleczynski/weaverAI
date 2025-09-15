import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // Use string suffixes; ".example.com" matches any host ending with that domain
    allowedHosts: [
      '.wpenginepowered.com',
      '.js.wpenginepowered.com',
    ],
  },
})
