import { AppServerModule } from './app/app.server.module';

/**
 * This file is the entry point for the server-side rendering bundle.
 * It simply exports the server-side application module.
 * * When using NgModules for Universal (SSR), the default export should be 
 * the AppServerModule, not a function using bootstrapApplication.
 */
export default AppServerModule;