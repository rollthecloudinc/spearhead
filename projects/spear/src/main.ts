// This file is now solely responsible for initializing Native Federation
// and then dynamically loading the true Angular bootstrap logic.

import { initFederation } from '@angular-architects/native-federation';

// 1. Initialize Native Federation
// This step asynchronously loads the federation manifest and configures
// the browser's module loader (via es-module-shims) with the Import Map.
initFederation()
  .catch(err => console.error('Error loading federation configuration:', err))
  .then(_ => {
    // 2. Load the actual Angular application bootstrap file after initFederation is complete.
    // We use a dynamic import here to ensure the module resolution is fully set up.
    import('./bootstrap')
      .catch(err => console.error(err));
  });