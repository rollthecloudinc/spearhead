import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// This line dynamically imports and executes the logic from the 
// 'bootstrap.ts' file, which contains the call to bootstrap your AppModule.
import('./bootstrap')
  .catch(err => console.error(err));