import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages project sites, change this to '/YOUR-REPOSITORY-NAME/'.
  // For Netlify or a custom domain, '/' is usually correct.
  base: '/',
});
