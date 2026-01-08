import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { prerender } from '@angular-devkit/build-angular';
import fs from 'node:fs';

// 1. Load the built server bundle (ESM)
const serverBundlePath = resolve('dist/spear-server/main.server.mjs');
const serverModule = await import(pathToFileURL(serverBundlePath));

// 2. Create the Angular DI environment from the server module
const {
  createServerEnvironment: createServerEnvironment,
  RouteGeneratorService,
} = serverModule;

// Important: Server bundle must export these symbols.
// I will show how to expose them in the next step.

// 3. Create the Angular server environment (DI container)
const env = createServerEnvironment({
  providers: [RouteGeneratorService],
});

// 4. Resolve your service from DI
const routeService = env.injector.get(RouteGeneratorService);

// 5. Fetch dynamic routes
console.log('[Prerender] Loading routes via Angular DI...');
const routes = await routeService.getRoutes();
console.log('[Prerender] Dynamic Routes:', routes);

// 6. Now run the Angular CLI prerenderer
await prerender({
  browserTarget: 'spear:build:production',
  serverTarget: 'spear:server:production',
  routes
});

console.log('[Prerender] Complete.');