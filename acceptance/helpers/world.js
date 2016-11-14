'use strict';

var Promise = require('bluebird');
var Nemo = require('nemo');
var configuration = require('../config/utils/configuration');
var nemoPage = require('nemo-pageobjects').nemoPage;
var sauceConfig = require('../config/sauce.json');
var commonConfig = require('../config/config.json');
var Keys = require('../config/utils/keys');
var replicate = require('cucumber-replicate').replicate;

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

            return nemoPage({nemo: world.nemo, baseDir: world.nemo._config.get(Keys.BASE_DIR)})
                .then(resolve)
                .catch(reject);
        }

        function instantiateNemo() {
            options.sauce = process.env[Keys.SAUCE];

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
