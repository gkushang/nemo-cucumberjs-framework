var {defineSupportCode} = require('cucumber');
var Promise = require('bluebird');
var Nemo = require('nemo');
var configuration = require('../config/utils/configuration');
var nemoPage = require('nemo-pageobjects').nemoPage;
var sauceConfig = require('../config/sauce.json');
var commonConfig = require('../config/config.json');
var Keys = require('../config/utils/keys');
var replicate = require('cucumber-replicate').replicate;

function CustomWorld({attach, parameters}) {


    this.attach = attach;
    this.parameters = parameters;

    this.nemo = function(scenario) {
        return new Promise(function (resolve, reject) {

            var options = {
                sauceConfig: sauceConfig,
                commonConfig: commonConfig,
                replicate: {
                    baseDir: commonConfig.baseDir
                },
                map: {
                    key: Keys.SAUCE,
                    featurePath: scenario.uri
                }
            };

            function _cbNemo(err) {

                if (err) {
                    return reject(err);
                }
                function assignNemoPage(page) {
                    nemo.page = page;
                    return nemo;
                }

                nemo.waitTimeOut = nemo._config.get(Keys.WAIT_TIMEOUT);

                nemoPage({nemo: nemo, baseDir: nemo._config.get(Keys.BASE_DIR)})
                    .then(assignNemoPage)
                    .then(resolve)
                    .catch(reject);
            }

            var nemo = new Nemo(configuration.getBaseDir(options),
                configuration.override(options), _cbNemo);

            function returnNemo() {
                return nemo;
            }

            return replicate(options.replicate).map(options.map).then(returnNemo);
        });
    };
}

defineSupportCode(function ({setWorldConstructor}) {
    setWorldConstructor(CustomWorld)
});