let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your theme. By default, we are compiling the Sass file for the theme
 | as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
   resolve: {
       alias: {
           "Components": path.resolve(
               __dirname,
               "src/components/components"
           )
       }
   }
})

mix.setPublicPath('dist')
   .js('src/app.js', 'scripts/')
   .extract([
      'babel-preset-env',
      'babel-polyfill',
      'babel-plugin-transform-es2015-arrow-functions',
      'jquery',
      'axios',
      'lodash',
      'vue',
      'bootstrap-vue',
      'vuex',
      'vuex-localstorage'
   ])
   .sass('src/styles/app.scss', 'styles/')
   .copyDirectory('src/assets', 'dist/assets')
   .options({
      processCssUrls: false
    })
   .version();
