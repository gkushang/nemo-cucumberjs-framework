var {defineSupportCode} = require('cucumber');
var Promise = require('bluebird');
var Nemo = require('nemo');
var configuration = require('../config/utils/configuration');
var nemoPage = require('nemo-pageobjects').nemoPage;
var sauceConfig = require('../config/sauce.json');
var commonConfig = require('../config/config.json');
var Keys = require('../config/utils/keys');
var replicate = require('cucumber-replicate').replicate;

function CustomWorld() {

    var world = this;

    this.abc = 'abc';

    var options = {
        sauceConfig: sauceConfig,
        commonConfig: commonConfig,
        replicate: {
            baseDir: commonConfig.baseDir
        },
        map: {
            key: Keys.SAUCE
        }
    };

    this.nemo = new Promise(function (resolve, reject) {

        function _cbNemo(err) {

            if (err) {
                return reject(err);
            }

            console.log('nemo at world ', nemo);

            nemo.waitTimeOut = nemo._config.get(Keys.WAIT_TIMEOUT);

            return nemoPage({nemo: nemo, baseDir: nemo._config.get(Keys.BASE_DIR)})
                .then(resolve)
                .catch(reject);
        }

        var nemo = new Nemo(configuration.getBaseDir(options),
            configuration.override(options), _cbNemo);

        return nemo;
    })
}

defineSupportCode(function ({setWorldConstructor}) {
    setWorldConstructor(CustomWorld)
});