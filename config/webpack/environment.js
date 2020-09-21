const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
const modernizr = require('./modernizr');

environment.config.merge(modernizr);
environment.plugins.append('Provide',
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    })
)

module.exports = environment
