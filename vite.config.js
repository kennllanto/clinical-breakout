import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path is configurable so the same build works on:
//  - GitHub Pages:  set VITE_BASE="/<repo-name>/"  (e.g. "/vasoactive-gauntlet/")
//  - Vercel/Netlify/Cloudflare (domain root): leave VITE_BASE unset -> "/"
// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
