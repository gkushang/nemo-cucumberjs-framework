'use strict';

var Promise = require('bluebird');
var Nemo = require('nemo');
var configuration = require('automation-utils').configuration;
var nemoPage = require('automation-utils').nemoPage;
var sauceConfig = require('../config/sauce.json');
var commonConfig = require('../config/config.json');
var Keys = require('../config/keys');
var replicate = require('automation-utils').replicate;

function World() {

    var world = this;

    function launchNemo(resolve, reject) {

        var options = {
            sauceConfig: sauceConfig,
            commonConfig: commonConfig,
            replicate: {
                baseDir: commonConfig.baseDir
            },
            map: {
                key: Keys.SAUCE,
                featurePath: world.scenario.getUri()
            }
        };

        function _cbNemo(err) {

            if (err) {
                return reject(err);
            }

            world.nemo.waitTimeOut = world.nemo._config.get(Keys.WAIT_TIMEOUT);

            return nemoPage(world)
                .then(resolve)
                .catch(reject);
        }

        function instantiateNemo() {
            options.sauce = process.env[Keys.SAUCE];
            console.log('sauce ==>>>>>>>>>> ', options.sauce);

            world.nemo = new Nemo(configuration.getBaseDir(options),
                configuration.override(options), _cbNemo);
            return world.nemo;
        }

        return replicate(options.replicate)
            .map(options.map)
            .then(instantiateNemo)
            .catch(reject);
    }

    return new Promise(launchNemo);
}

module.exports = function() {
    this.World = World;
};
