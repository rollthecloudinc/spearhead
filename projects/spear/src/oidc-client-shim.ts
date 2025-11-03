// projects/spear/src/oidc-client-shim.ts

// 1. Import necessary Node.js utilities for CJS loading in ESM context
import { createRequire } from 'node:module'; 
import { fileURLToPath } from 'node:url'; 

// 2. Create a CJS 'require' function
const require = createRequire(import.meta.url);

// 3. Synchronously load the oidc-client package using require()
// This guarantees the module is loaded as CommonJS.
const oidcClientModule = require('oidc-client');

// 4. Extract the CJS exports defensively
// The CJS exports are often the direct module.exports or a 'default' property.
const oidcExports = oidcClientModule.default || oidcClientModule;

// 5. Re-export the components as named exports (what the consumer expects)
export const UserManager = oidcExports.UserManager;
export const WebStorageStateStore = oidcExports.WebStorageStateStore;

// Add any other exports needed by @rollthecloudinc/oidc, e.g.:
// export const Log = oidcExports.Log;