// projects/spear/bootstrap-server.ts (Final Clean ESM)

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url'; 
// const indexedDbShim = require('indexeddbshim');

// Index db shim
//setGlobalVars(); // See signature below

// --- GLOBAL INDEXEDDB NO-OP SHIM START ---
// This mocks the IndexedDB API in the global scope when running on the server, 
// preventing errors for libraries that check for its existence, while ensuring 
// no actual browser APIs are called.

const applyNoopIndexedDBShim = (): void => {
    // Use globalThis for broad environment compatibility
    if (typeof globalThis.indexedDB === 'undefined') {
        
        // Define a base mock for IDBRequest to prevent property access errors
        const IDBRequestMock = {
            onsuccess: null,
            onerror: null,
            readyState: 'done',
            result: undefined,
            error: undefined,
            source: undefined,
            transaction: undefined,
        };

        // Define a mock for the main IndexedDB object (IDBFactory)
        const mockIndexedDB = {
            // open must return an IDBRequest-like object
            open: () => IDBRequestMock,
            // deleteDatabase must return an IDBRequest-like object
            deleteDatabase: () => IDBRequestMock,
            cmp: () => 0, // Comparison function
        };

        // Expose the mock API to the global scope using globalThis
        (globalThis as any).indexedDB = mockIndexedDB;

        // IDBKeyRange and other necessary classes
        (globalThis as any).IDBKeyRange = {
            bound: () => ({}),
            lowerBound: () => ({}),
            upperBound: () => ({}),
            only: () => ({}),
        };
        
        // Expose necessary classes to prevent 'class not defined' errors
        (globalThis as any).IDBCursor = class IDBCursor {};
        (globalThis as any).IDBCursorWithValue = class IDBCursorWithValue {};
        (globalThis as any).IDBDatabase = class IDBDatabase {};
        (globalThis as any).IDBObjectStore = class IDBObjectStore {};
        (globalThis as any).IDBTransaction = class IDBTransaction {};
    }
};

applyNoopIndexedDBShim();

// 💡 CJS DEPENDENCY FIX: Rely on the global/patched 'require' for CJS modules.
const cors = require('cors'); // ⬅️ USE GLOBAL REQUIRE

// 💡 ESM Path Logic (for __dirname equivalent)
const __dirname = dirname(fileURLToPath(import.meta.url));

// 💡 ESM Path Logic (for __filename equivalent)
const __filename = fileURLToPath(import.meta.url);

// 🚨 FIX: Assign __dirname and __filename to globalThis 
// This makes them accessible to legacy CJS dependencies like indexeddbshim.
global.__dirname = __dirname;
global.__filename = __filename;

// indexedDbShim.setGlobalVars()

const browserDistFolder = join(__dirname, '../browser'); 

const app = express();
app.use(cors());
app.set('view engine', 'html');
const angularApp = new AngularNodeAppEngine();

// ... (rest of the code is the same)

// 💡 CJS/ESM Main Module Check
const isMainModule = () => {
    // Check if the current module is being run directly (not imported)
    return process.argv[1] === __filename;
};

/**
 * Start the server...
 */
if (isMainModule() || process.env['pm_id']) {
  const port = process.env['PORT'] || 4200;
  app.listen(port, (/*error*/) => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI ...
 */
export const reqHandler = createNodeRequestHandler(app);