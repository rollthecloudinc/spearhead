import { AppServerModule } from './app/app.server.module';

// Export our DI service so prerender script can access it
export { RouteGeneratorService } from './app/services/route-generator.service';

/**
 * This file is the entry point for the server-side rendering bundle.
 * It simply exports the server-side application module.
 * * When using NgModules for Universal (SSR), the default export should be 
 * the AppServerModule, not a function using bootstrapApplication.
 */
export default AppServerModule;