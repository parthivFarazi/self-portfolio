import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 5273 because 5173 is owned by another local project (job-search dashboard).
  // strictPort so vite fails loudly if 5273 is also taken — surfaces conflicts.
  server: { host: true, port: 5273, strictPort: true },
});
