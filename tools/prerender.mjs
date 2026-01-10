import fs from 'node:fs';
import path from 'node:path';
import { prerender } from '@angular-devkit/build-angular';

function loadDynamicRoutes() {
  const base = path.resolve(
    process.cwd(),
    'projects/spear/src/assets/objects/panelpage'
  );

  const out = [];

  for (const file of fs.readdirSync(base)) {
    if (!file.endsWith('.json')) continue;

    const json = JSON.parse(fs.readFileSync(path.join(base, file), 'utf8'));

    if (json.path) {
      out.push(json.path);
      out.push(json.path + '/manage');
    }
  }

  out.push('/');
  return out;
}

const routes = loadDynamicRoutes();
console.log('Dynamic prerender routes:', routes);

await prerender({
  browserTarget: 'spear:build:development',
  serverTarget: 'spear:server:development',
  routes,
});