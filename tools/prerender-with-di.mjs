import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// ------------------------------------------------------------
// 1. Load dynamic routes from JSON files
// ------------------------------------------------------------
function loadDynamicRoutes() {
  const base = path.resolve(
    process.cwd(),
    'projects/spear/src/assets/objects/panelpage'
  );

  const out = [];

  for (const f of fs.readdirSync(base)) {
    if (!f.endsWith('.json')) continue;

    const json = JSON.parse(fs.readFileSync(path.join(base, f), 'utf8'));

    if (json.path) {
      out.push(json.path);
      out.push(json.path + '/manage');
    }
  }

  out.push('/');
  return out;
}

// ------------------------------------------------------------
// 2. Load your SSR bundle (compiled server.js)
// ------------------------------------------------------------
async function loadSSRRenderer() {
  const serverBundlePath = path.resolve(
    process.cwd(),
    'dist/spear-server/server.mjs'
  );

  if (!fs.existsSync(serverBundlePath)) {
    throw new Error('SSR bundle not found: ' + serverBundlePath);
  }

  return import(pathToFileURL(serverBundlePath).href);
}

// ------------------------------------------------------------
// 3. Render a page using your SSR engine
// ------------------------------------------------------------
async function renderRoute(renderFunction, route) {
  const html = await renderFunction(route);

  // Output path
  const outputPath = path.resolve(
    process.cwd(),
    'dist/spear/browser',
    route === '/' ? '' : route.substring(1)
  );

  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(path.join(outputPath, 'index.html'), html);
}

// ------------------------------------------------------------
// 4. Main execution
// ------------------------------------------------------------
async function run() {
  const routes = loadDynamicRoutes();
  console.log('Dynamic prerender routes:', routes);

  const { render } = await loadSSRRenderer();

  if (typeof render !== 'function') {
    throw new Error('SSR bundle does not export a render() function.');
  }

  for (const route of routes) {
    console.log('Prerendering:', route);
    await renderRoute(render, route);
  }

  console.log('Prerender complete.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});