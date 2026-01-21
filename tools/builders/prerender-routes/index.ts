import 'zone.js/node';
import 'reflect-metadata';
import '@angular/compiler';

// 2. The critical "Linker" fix for Ivy decorators
import { ɵglobal } from '@angular/core';
(ɵglobal as any).ngDevMode = true;
(ɵglobal as any).ngJitMode = true;

// This is the CRITICAL part: it helps Node understand the decorators at runtime
import { LinkerOptions, FileLinker } from '@angular/compiler-cli/linker';

import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import { INITIAL_CONFIG, platformServer } from '@angular/platform-server';
import { AppServerModule } from '../../../projects/spear/src/app/app.server.module';
//import { RouteService } from '../../../src/app/services/route.service'; // Your service
import * as fs from 'fs';
import path from 'node:path';
import { COMPILER_OPTIONS } from '@angular/core';
import { ResourceLoader } from '@angular/compiler';
import { DatasourcePluginManager } from '@rollthecloudinc/datasource';
import { PanelPage } from '@rollthecloudinc/panels';
import { TokenizerService } from '@rollthecloudinc/token';
import { AttributeSerializerService } from '@rollthecloudinc/attributes';
import { firstValueFrom } from 'rxjs';

interface Options extends JsonObject {
  outputPath: string;
  routesPath: string;
}

// A simple loader that reads files from the file system
class FileSystemResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    // Resolve the path relative to the component file if necessary
    // This is a simplified version
    return Promise.resolve(/*fs.readFileSync(url, 'utf-8')*/"");
  }
}

export default createBuilder(async (options: Options, context: BuilderContext): Promise<BuilderOutput> => {
  context.logger.info('🚀 Bootstrapping DI container to fetch routes...');

  try {
    const platformRef = platformServer([
        // Satisfy the Server Platform requirements
        { provide: INITIAL_CONFIG, useValue: { url: '/', document: '<app-root></app-root>' } },
        {
            provide: COMPILER_OPTIONS,
            useValue: { providers: [{ provide: ResourceLoader, useClass: FileSystemResourceLoader, deps: [] }] },
            multi: true
        }
    ]);
    const moduleRef = await platformRef.bootstrapModule(AppServerModule);

    const dpm = moduleRef.injector.get(DatasourcePluginManager);
    const tokenizer = moduleRef.injector.get(TokenizerService)
    const serializer = moduleRef.injector.get(AttributeSerializerService)

    const { prerender, routes } = await loadDynamicRoutes({ dpm, tokenizer, context, serializer });
    
    fs.writeFileSync(options.outputPath, prerender.join('\n'));
    fs.writeFileSync(options.routesPath, `export const panelpages = [ ${routes.map(r => `['${r[0]}', '${r[1]}']`).join(',\n')}]`); 

    context.logger.info(`✅ Successfully generated ${prerender.length} prerender routes.`);
    context.logger.info(`✅ Successfully generated ${routes.length} routes.`);
    
    platformRef.destroy();  
    return { success: true };
  } catch (err) {
    context.logger.error('❌ Failed to generate routes: ' + err);
    return { success: false };
  }
});

async function loadDynamicRoutes({ dpm, tokenizer, context, serializer }: { dpm: DatasourcePluginManager, tokenizer: TokenizerService, context: BuilderContext, serializer: AttributeSerializerService }): Promise<{ prerender: Array<string>, routes: Array<Array<string>>}> {
  const base = path.resolve(
    process.cwd(),
    'projects/spear/src/assets/objects/panelpage'
  );

  const out = [];
  const routes: Array<Array<string>> = [];

  out.push('/');

  for (const f of fs.readdirSync(base)) {
    if (!f.endsWith('.json')) continue;

    const json = JSON.parse(fs.readFileSync(path.join(base, f), 'utf8'));
    const pp = new PanelPage(json)

    if (pp.path && pp.path != '') {
        routes.push([pp.id, pp.path]);
    }

    if (pp.prerender && pp.prerender.datasource && pp.prerender.route && pp.prerender.route.length > 0 && pp.path && pp.path.length > 0) {
        const ds = await firstValueFrom(dpm.getPlugin(pp.prerender.datasource.plugin));
        // context.logger.info(`[PRERENDER] Fetching data for PanelPage ${pp.id} from datasource plugin ${pp.prerender.datasource.plugin}`);
        const data = await firstValueFrom(ds.fetch({ settings: pp.prerender.datasource.settings }));
        // context.logger.info(`[PRERENDER] Data fetched for PanelPage ${pp.id}: ${JSON.stringify(data)}`);
        if (data.results && Array.isArray(data.results)) {
            for (const item of data.results) {
                const tokens = tokenizer.generateGenericTokens(item)
                const route = tokenizer.replaceTokens(pp.path + pp.prerender.route, tokens)
                out.push(route);
            }
        }
    }

    if (pp.path) {
      out.push(pp.path);
      out.push(pp.path + '/manage');
    }
  }

  // out.push('/');
  return Promise.resolve({ prerender: out, routes });
}