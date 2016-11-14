'use strict';

var log = require('debug')('configuration');
var _ = require('lodash');
var Keys = require('./keys');

module.exports = {

    override: function(options) {

        var sauce = options.sauce || process.env[Keys.SAUCE];
        var enableAppScan = process.env[Keys.ENABLE_APPSCAN];
        var PARENT_TUNNEL_IDENTIFIER = _.get(options.commonConfig, 'driver.serverCaps.parentTunnelIdentifier');

        var config = {};
        
        if (sauce) {
            if (!options.sauceConfig[sauce]) {
                throw new Error('SAUCE value ' + sauce + ' does not exists. Please verify your command line arguments.');
            }

            config = options.sauceConfig[sauce];
            config.driver.serverCaps[Keys.SAUCE_LABS.PARENT_TUNNEL] = PARENT_TUNNEL_IDENTIFIER;
        }

        if (enableAppScan && options.appScanPlugin) {
            log('app scan plugin requested');
            config = _.merge(config, options.appScanPlugin);
        }

        return config;
    },

    getBaseDir: function(options) {
        return process.cwd() + options.commonConfig.baseDir;
    }
};
