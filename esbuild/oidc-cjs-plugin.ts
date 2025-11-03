// oidc-cjs-plugin.js
import type { Plugin, PluginBuild } from 'esbuild';
/**
 * ESBuild Plugin to force CommonJS interop for 'oidc-client'
 * by treating it as an external dependency and simulating ESM exports
 * from the CJS exports object.
 */
const oidcClientPlugin: Plugin = {
  name: 'oidc-cjs-interop',
  setup(build: PluginBuild) {
    console.log('[oidc-cjs-interop] Plugin loaded and setting up hooks.');

    // 1. Intercept the resolve for 'oidc-client'
    build.onResolve({ filter: /^oidc-client$/ }, (args) => {
      // Return a path with the `namespace` field set. This tells esbuild
      // to handle the path in a custom way defined by the onLoad hook.
      // We also use the resolveDir to ensure we find the package root.
      return { path: args.path, namespace: 'oidc-cjs-ns', resolveDir: args.resolveDir };
    });

    // 2. Load the custom namespace file content
    build.onLoad({ filter: /^oidc-client$/, namespace: 'oidc-cjs-ns' }, async (args) => {
      // The core fix: Tell esbuild to require the module (CJS) and then
      // use the 'export *' syntax to create named exports for everything
      // available on the exports object (including UserManager).
      return {
        contents: `
          const cjsModule = require('${args.path}');
          // Re-export everything available on the CJS exports object as named exports
          module.exports = cjsModule;
          export * from '${args.path}';
        `,
        // Set the loader to JS so it handles the CJS require
        loader: 'js',
      };
    });
  },
};

//export default oidcClientPlugin