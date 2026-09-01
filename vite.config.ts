import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Inline (empty) PostCSS config so Vite doesn't search parent directories
  // for a postcss.config.*, which was picking up an unrelated file at
  // C:\Users\USER\postcss.config.mjs belonging to a different project.
  css: {
    postcss: {
      plugins: [],
    },
  },
});
