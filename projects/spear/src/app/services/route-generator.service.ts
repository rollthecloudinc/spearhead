import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RouteGeneratorService {

  private http = inject(HttpClient);

  async getRoutes(): Promise<string[]> {
    const routes: string[] = [];

    // --------------------------------------------------------
    // A) Read dynamic panel page routes from JSON (filesystem)
    // --------------------------------------------------------
    const jsonFolder = path.resolve(
      process.cwd(),
      'projects/spear/src/assets/objects/panelpage'
    );

    const files = fs.readdirSync(jsonFolder);

    for (const f of files) {
      if (!f.endsWith('.json')) continue;

      const data = JSON.parse(
        fs.readFileSync(path.join(jsonFolder, f), 'utf8')
      );

      if (data.path) {
        routes.push(data.path);
        routes.push(data.path + '/manage');
      }
    }

    // --------------------------------------------------------
    // B) Fetch dynamic routes from an API (optional)
    // --------------------------------------------------------
    /*try {
      const apiRoutes = await firstValueFrom(
        this.http.get<string[]>('https://YOUR_API/dynamic-routes')
      );
      routes.push(...apiRoutes);
    } catch (err) {
      console.warn('API route load failed:', err);
    }*/

    // --------------------------------------------------------
    // C) Add static fallback routes
    // --------------------------------------------------------
    routes.push('/');
    routes.push('/pages/create-panel-page');

    // Ensure uniqueness
    return Array.from(new Set(routes));
  }
}