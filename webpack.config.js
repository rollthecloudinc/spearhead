// This file is used to customize the Webpack configuration for the Angular build process.
// It is primarily used here to handle specific module loading issues in node_modules
// that arise when using Native Federation.

module.exports = {
  // Suppress the expected "Critical dependency" warning from Native Federation's dynamic imports
  stats: {
    warningsFilter: /Critical dependency: the request of a dependency is an expression/
  },
  
  // Custom module rules to exclude specific problematic files from certain loaders
  module: {
    rules: [
      {
        // Target the Native Federation index.js file which uses ES Module syntax 
        // that conflicts with the default Angular Babel/Webpack processing chain.
        test: /@angular-architects\/native-federation\/src\/index\.js$/,
        // The type 'javascript/auto' is used here to prevent Webpack from
        // trying to guess the module type (and failing). This fixes the 
        // "Module parse failed: 'import' and 'export' may appear only with 'sourceType: module'" error.
        type: 'javascript/auto'
      },
    ]
  }
};