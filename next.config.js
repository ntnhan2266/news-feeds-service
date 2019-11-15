const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([
        withSass(
            withCSS({
                postcssLoaderOptions: {
                    parser: true
                },
                cssModules: true,
                cssLoaderOptions: {
                    url: false,
                    importLoaders: 1,
                    localIdentName: "[local]",
                },
                sassLoaderOptions: {
                    includePaths: [require('path').resolve(__dirname, 'node_modules')]
                },
            }))
]);
