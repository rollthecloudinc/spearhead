// This new file contains the original Angular bootstrap call.
// It is imported dynamically by main.ts *after* initFederation is complete.

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Adjust if using standalone components

// NOTE: If you are using standalone components, replace the above imports
// and the code below with your actual standalone bootstrap:
//
// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
//
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

// Assuming a standard module-based application structure:
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));