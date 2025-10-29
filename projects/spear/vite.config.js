import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // Exclude es-module-shims from pre-bundling and import analysis
    exclude: ['es-module-shims'],
  },
  // If the error persists, you might also need to exclude it from Rollup options
  // during the build/serve step, although 'optimizeDeps' is usually the fix for dev server errors.
  build: {
    rollupOptions: {
      external: ['es-module-shims'],
    },
  }
});