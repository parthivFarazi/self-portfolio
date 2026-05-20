import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.ANALYZE
      ? [
          visualizer({
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true,
            open: false,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    // Force a single three.js instance. Without this, `postprocessing` resolves
    // its own copy and the EffectComposer's bloom/vignette render against a
    // different THREE.Scene class than R3F's scene — composer silently no-ops.
    dedupe: ['three'],
  },
  optimizeDeps: {
    include: ['three', 'postprocessing', '@react-three/postprocessing'],
  },
  // 5273 because 5173 is owned by another local project (job-search dashboard).
  // strictPort so vite fails loudly if 5273 is also taken — surfaces conflicts.
  server: { host: true, port: 5273, strictPort: true },
});
