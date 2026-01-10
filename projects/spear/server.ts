import { createApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { RouteGeneratorService } from './src/app/services/route-generator.service.js';

export async function getPrerenderRoutes() {
  console.log('[NF] Running dynamic prerender route discovery...');

  const app = await createApplication({
    providers: [
      provideHttpClient(),
      RouteGeneratorService
    ]
  });

  const gen = app.injector.get(RouteGeneratorService);
  const routes = await gen.getRoutes();

  console.log('[NF] Discovered routes:', routes);

  return routes;
}

// -------------------------------------------------------
// NATIVE FEDERATION SERVER BOOTSTRAP
// -------------------------------------------------------

import { initNodeFederation } from '@softarc/native-federation-node';
import { join } from 'node:path'; // Keep this
// Remove fileURLToPath and dirname imports (reverting the ESM fix for now)

console.log('Starting SSR for Shell');

// 💡 NEW LOGIC: Use the absolute path relative to the project root CWD.
// We are forcing the system to look where the file *must* exist.
// CWD is /home/tzmijewski/projects/spearhead
const BROWSER_DIR_PATH = join(process.cwd(), 'dist', 'spear', 'browser'); 

// ... (Your path calculation logic, e.g., BROWSER_DIR_PATH)

(async () => {
  try { // ⬅️ START TRY BLOCK
    await initNodeFederation({
      remotesOrManifestUrl: {}, 
      relBundlePath: /*'../browser'*/ BROWSER_DIR_PATH, 
    });

  } catch (e: any) { // ⬅️ CATCH THE NON-ERROR VALUE
    // Log the actual value being thrown for inspection
    console.error('⚠️ NATIVE FEDERATION ERROR CATCHED:');
    console.error(e); 
    
    // Re-throw a standardized Error object to satisfy the Node environment
    // This allows the Angular CLI to display the log above and then fail gracefully.
    throw new Error('Native Federation init failed due to non-standard throw value. Check console output above.');
  } // ⬅️ END CATCH BLOCK

  await import('./bootstrap-server');

})();