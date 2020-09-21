const { environment } = require('@rails/webpacker')

const modernizr = require('./modernizr');
environment.config.merge(modernizr);

module.exports = environment
