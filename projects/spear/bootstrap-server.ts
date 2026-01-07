// -------------------------------------------------------
//  bootstrap-server.ts (COMPLETE + NO TOP-LEVEL AWAIT)
// -------------------------------------------------------

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// IndexedDB shim (unchanged)
const applyNoopIndexedDBShim = (): void => {
  if (typeof globalThis.indexedDB === 'undefined') {
    const IDBRequestMock = {
      onsuccess: null,
      onerror: null,
      readyState: 'done',
      result: undefined,
      error: undefined,
      source: undefined,
      transaction: undefined,
    };

    const mockIndexedDB = {
      open: () => IDBRequestMock,
      deleteDatabase: () => IDBRequestMock,
      cmp: () => 0,
    };

    (globalThis as any).indexedDB = mockIndexedDB;

    (globalThis as any).IDBKeyRange = {
      bound: () => ({}),
      lowerBound: () => ({}),
      upperBound: () => ({}),
      only: () => ({}),
    };

    (globalThis as any).IDBCursor = class {};
    (globalThis as any).IDBCursorWithValue = class {};
    (globalThis as any).IDBDatabase = class {};
    (globalThis as any).IDBObjectStore = class {};
    (globalThis as any).IDBTransaction = class {};
  }
};
applyNoopIndexedDBShim();

// CJS deps
const cors = require('cors');

// ESM global vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.__dirname = __dirname;
global.__filename = __filename;

// Angular DI route generator
import { createApplication } from '@angular/platform-browser';
import { RouteGeneratorService } from './src/app/services/route-generator.service.js';

// -------------------------------------------------------
// EXPRESS + SSR
// -------------------------------------------------------
const browserDistFolder = join(__dirname, '../browser');
const app = express();
app.use(cors());
app.set('view engine', 'html');

const angularEngine = new AngularNodeAppEngine();

// -------------------------------------------------------
// ⭐ INIT FUNCTION (replaces top-level await)
// -------------------------------------------------------
async function initServer() {
  console.log('[SSR] Initializing Angular DI container...');

  // Create Angular DI context
  const angularAppContext = await createApplication({
    providers: [RouteGeneratorService],
  });

  // Get service instance
  const routeGen = angularAppContext.injector.get(RouteGeneratorService);

  const routes = await routeGen.getRoutes();
  console.log('[SSR] Dynamic prerender routes:', routes);

  // Register Express GET handlers for prerender discovery
  for (const r of routes) {
    app.get(r, (req, res, next) => next());
  }
}

// Call init without using top-level await
initServer().catch(err => {
  console.error('[SSR] Failed to initialize server prerender routes:', err);
});

// -------------------------------------------------------
// STATIC FILES
// -------------------------------------------------------
app.get('*.*', (req, res) => {
  res.sendFile(join(browserDistFolder, req.url));
});

// -------------------------------------------------------
// SSR HANDLER
// -------------------------------------------------------
app.get('*', async (req, res) => {
  try {
    const response = await angularEngine.handle(req);
    await writeResponseToNodeResponse(response, res);
  } catch (err) {
    console.error('[SSR] Render error:', err);
    res.status(500).send('Server Error');
  }
});

// -------------------------------------------------------
// START SERVER
// -------------------------------------------------------
const isMainModule = () =>
  process.argv[1] === __filename || process.env['pm_id'];

if (isMainModule()) {
  const port = process.env['PORT'] || 4200;
  app.listen(port, () =>
    console.log(`Node SSR server running at http://localhost:${port}`)
  );
}

// Export handler for Angular CLI prerender
export const reqHandler = createNodeRequestHandler(app);