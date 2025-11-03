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
    // Only apply if the IndexedDB API is not already present (i.e., we are on Node)
    if (typeof global.indexedDB === 'undefined') {
        // Mock IDBRequest object (required return type for open/delete)
        const mockIDBRequest: any = {
            onsuccess: null,
            onerror: null,
            readyState: 'done',
            result: null,
            error: null,
            source: null,
            transaction: null,
        };

        // Mock the IDBFactory (the global 'indexedDB' object)
        const mockIndexedDB: any = {
            open: () => {
                // Simulate success immediately on the next tick
                process.nextTick(() => {
                    if (typeof mockIDBRequest.onsuccess === 'function') {
                        // Pass mock target, as expected by IDBOpenDBRequest API
                        mockIDBRequest.onsuccess({ target: mockIDBRequest });
                    }
                });
                return mockIDBRequest;
            },
            deleteDatabase: () => mockIDBRequest,
            cmp: () => 0, // Comparison function
        };
        
        // Expose the mock API to the global scope
        (global as any).indexedDB = mockIndexedDB;

        // IDBKeyRange is often checked by IndexedDB wrappers/libraries
        (global as any).IDBKeyRange = {
            bound: () => ({}),
            lowerBound: () => ({}),
            upperBound: () => ({}),
            only: () => ({}),
        };
        
        // Expose IDBCursor and other necessary classes
        // Use standard TypeScript class syntax
        (global as any).IDBCursor = class IDBCursor {};
        (global as any).IDBCursorWithValue = class IDBCursorWithValue {};
        (global as any).IDBDatabase = class IDBDatabase {};
        (global as any).IDBObjectStore = class IDBObjectStore {};
        (global as any).IDBTransaction = class IDBTransaction {};
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