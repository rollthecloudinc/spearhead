const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'spear',

  /*: {
    './Component': './projects/spear/src/app/app.component.ts',
  },*/

  shared: {
    // Share all standard Angular dependencies (core, common, router, etc.)
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),

    // Explicitly share custom/internal libraries.
    // Setting 'strictVersion: false' allows for slightly different versions
    // as long as they are backward-compatible.
    /*"@rollthecloudinc/auth": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "@rollthecloudinc/oidc": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "@rollthecloudinc/utils": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "@rollthecloudinc/attributes": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "@rollthecloudinc/plugin": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "@rollthecloudinc/material": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "@rollthecloudinc/content": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },*/
    
    /*'oidc-client': { 
      singleton: true, 
      strictVersion: true, 
      requiredVersion: 'auto' 
    },*/

    // Explicitly share zone.js as a singleton. This is CRUCIAL for Angular
    // to prevent change detection errors if you aren't running zoneless.
    'zone.js': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    'oidc-client',
    'number-string',
    '@aws-crypto/crc32',
    "json-rules-engine",
    "recursive-diff",
    "cssjson",
    'jsonpath-plus',
    'tslib',
    //'@angular/platform-browser/animations'
    '@softarc/native-federation-runtime'
    /*"es-module-shims"*/
    // Add further packages you don't need at runtime
  ],

  externals: [
    'oidc-client',
    "@angular-architects/native-federation"
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true
  },

  /*output: {
    uniqueName: 'spear', // Unique name for your application
    publicPath: 'auto',   // Use 'auto' to rely on the dev server base URL (best practice)
    // If 'auto' fails, explicitly set to '/' or the full path.
    // publicPath: 'http://localhost:4000/' 
  },*/

  extraWebpackConfig: {
  module: {
      rules: [
        {
          // This rule targets the Babel loader used by Angular CLI
          test: /\.m?js$/,
          // Crucially, EXCLUDE the native federation packages from processing by Babel/Webpack loaders
          // The error indicates a file from this path is being processed incorrectly.
          exclude: [
            /node_modules\/@angular-architects\/native-federation/,
            /node_modules\/@softarc\/native-federation-runtime/,
          ],
        }
      ]
    }
    }

  // Fix for 'Module parse failed: 'import' and 'export'...' error and 'remoteEntry.js' path error
  /*extraWebpackConfig: {
    module: {
      rules: [
        {
          // Explicitly target the Native Federation runtime files
          test: /@angular-architects\/native-federation\/src\/index\.js$/,
          // Tell Webpack to treat it as a standard ES Module, preventing default loaders from failing.
          type: 'javascript/auto',
          // Enforce this rule to run before default loaders
          enforce: "pre",
        },
      ],
    },
  }*/
  
});
