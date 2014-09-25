/**
 * Created by liuxing on 14-7-30.
 */
var _             = require('lodash'),
    path          = require('path'),
    rssConfig     = {},
    appRoot       = path.resolve(__dirname, '../../');
// Returns NODE_ENV config object

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
function config() {
    // @TODO: get rid of require statement.
    if (_.isEmpty(rssConfig)) {
        try {
            rssConfig = require(path.resolve(__dirname, '../../', 'config.js'))[process.env.NODE_ENV] || {};

        } catch (ignore) {
            console.err(ignore);
        }
            //ghostConfig = updateConfig(ghostConfig);
    }

    return rssConfig;
}

module.exports = config;