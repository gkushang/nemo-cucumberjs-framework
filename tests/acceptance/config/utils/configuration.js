'use strict';

var _ = require('lodash');
var Keys = require('./keys');
var path = require('path');

module.exports = {

    override: function (options) {

        var sauce = options.sauce || process.env[Keys.SAUCE];

        var PARENT_TUNNEL_IDENTIFIER = _.get(options.commonConfig, 'driver.serverCaps.parentTunnelIdentifier');

        var config = {};

        if (sauce) {

            if (!options.sauceConfig[sauce]) {
                throw new Error('SAUCE value ' + sauce + ' does not exists. Please verify your command line arguments.');
            }

            config = options.sauceConfig[sauce];
            config.driver.serverCaps[Keys.SAUCE_LABS.PARENT_TUNNEL] = PARENT_TUNNEL_IDENTIFIER;
            config.driver.server = options.commonConfig.driver.server.replace('{SAUCE_USERNAME}', options.commonConfig.SAUCE_USERNAME).replace('{SAUCE_ACCESS_KEY}', options.commonConfig.SAUCE_ACCESS_KEY);
        }

        return config;
    },

    getBaseDir: function (options) {
        return path.join(process.cwd(), options.commonConfig.baseDir);
    }
};
