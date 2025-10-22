const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;
// const tailwindcss = require('tailwindcss'); // REMOVE THIS LINE
// const autoprefixer = require('autoprefixer'); // REMOVE THIS LINE

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  []);

module.exports = {
  output: {
    uniqueName: "spear",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  // FIXED PLUGINS ARRAY
  plugins: [
    // tailwindcss, // removed
    // autoprefixer, // removed
    new ModuleFederationPlugin({
        library: { type: "module" },
        
        // ... (rest of your Module Federation configuration is unchanged)
        /*remotes: {
          "fedMicroNg": "http://localhost:3000/remoteEntry.js"
        },*/

        shared: share({
          "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },
          "@angular/platform-browser/animations": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },

          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },
          "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: 'auto', eager: false },

          "@angular/cdk": { singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: true, eager: false },
          "@angular/material": { singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: true, eager: false },

          "@rollthecloudinc/utils": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
          "@rollthecloudinc/attributes": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
          "@rollthecloudinc/plugin": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
          "@rollthecloudinc/material": { singleton: true, strictVersion: false, requiredVersion: 'auto' },
          "@rollthecloudinc/content": { singleton: true, strictVersion: false, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};