const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .js('resources/vuejs/app.js', 'public/js')

    .sass('resources/sass/app.scss', 'public/css')

    .autoload({
        jQuery: ['$', 'window.jQuery', 'jQuery','jquery'],
        $: ['$', 'window.jQuery', 'jQuery','jquery'],
        jquery: ['$', 'window.jQuery', 'jQuery','jquery'],
    })
;

    mix.browserSync('bs.local');
