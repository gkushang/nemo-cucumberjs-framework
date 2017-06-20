'use strict';

var handle = require('../helpers/handler');
var cucumberWorld = require('../helpers/world');
var Keys = require('../config/utils/keys');
var sauceConfig = require('../config/sauce.json');

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Before, After}) {

    // launch Nemo
    Before(function (scenario, callback) {
        var world = this;

        function assignNemo(nemo) {
            world.nemo = nemo;
            return nemo;
        }

        this.nemo
            .then(assignNemo)
            .then(handle.onSuccess(callback))
            .catch(callback);
    });

    // update SauceLabs dashboard if tests are running on SAUCE
    Before(function (scenario, callback) {
        var world = this;
        var sauce = process.env[Keys.SAUCE];

        console.log('nemo at second before hoook is ', this.nemo);

        if (sauce) {
            var options = {
                name: scenario.getName(),
                cucumber_tags: scenario.getTags(),
                build: world.nemo._config.get(Keys.BUILD)
            };

            var sauceJobUrl = world.nemo.saucelabs.getJobUrl();

            var sauceInfo = sauceConfig[sauce].driver.serverCaps;

            sauceInfo.url = '<a href=' + sauceJobUrl + ' target="_blank">' + sauceJobUrl + '</a>';

            scenario.attach('Sauce: ' + JSON.stringify(sauceInfo, null, 4));

            world.nemo.saucelabs.updateJob(options)
                .then(handle.onSuccess(callback))
                .thenCatch(callback);
        } else {
            callback();
        }
    });

    // Take Screenshot if scenarios fails and Quit browser
    After(function (scenario, callback) {
        var world = this;

        function attachScreenshot(buffer) {
            return scenario.attach(new Buffer(buffer, 'base64'), 'image/png');
        }

        function takeScreenshotAndQuit() {
            function quitDriver() {
                return world.nemo.driver.quit();
            }

            if (scenario.isFailed()) {
                return world.nemo.driver.takeScreenshot()
                    .then(attachScreenshot)
                    .then(quitDriver);
            } else {
                return quitDriver();
            }
        }

        if (process.env[Keys.SAUCE]) {
            this.nemo.saucelabs.isJobPassed(!scenario.isFailed());
        }

        takeScreenshotAndQuit()
            .then(handle.onSuccess(callback))
            .thenCatch(callback);
    });

});
