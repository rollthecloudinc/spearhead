const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

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
  plugins: [
    tailwindcss,
    autoprefixer,
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        // name: "ipe",
        // filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './projects/ipe/src/app/app.component.ts',
        // },        
        
        // For hosts (please adjust)
        /*remotes: {
          "fedMicroNg": "http://localhost:3000/remoteEntry.js"
        },*/

        shared: share({
          "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/platform-browser/animations": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          "@angular/cdk": { singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: true },
          "@angular/material": { singleton: true, strictVersion: true, requiredVersion: 'auto', includeSecondaries: true },

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
