'use strict';

var handle = require('../helpers/handler');
var Keys = require('../config/utils/keys');
var sauceConfig = require('../config/sauce.json');

var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Before, After, setDefaultTimeout}) {

    var cucumberStepTimeoutInMilliseconds = 400000;

    setDefaultTimeout(cucumberStepTimeoutInMilliseconds);

    // Before(function (scenarioResult, callback) {
    //
    //     this.replicate(scenarioResult.scenario)
    //         .then(handle.onSuccess(callback))
    //         .catch(callback);
    //
    // });


    // launch Nemo
    Before(function (scenarioResult, callback) {
        var world = this;

        function assignNemo(nemo) {
            world.nemo = nemo;
            return world.nemo;
        }

        this.nemo(scenarioResult.scenario)
            .then(assignNemo)
            .then(handle.onSuccess(callback))
            .catch(callback);
    });


    // update SauceLabs dashboard if tests are running on SAUCE
    Before(function (scenarioResult, callback) {
        var world = this;
        var sauce = process.env[Keys.SAUCE];

        if (sauce) {
            var options = {
                name: scenarioResult.getName(),
                cucumber_tags: scenarioResult.getTags(),
                build: world.nemo._config.get(Keys.BUILD)
            };

            var sauceJobUrl = world.nemo.saucelabs.getJobUrl();

            var sauceInfo = sauceConfig[sauce].driver.serverCaps;

            sauceInfo.url = '<a href=' + sauceJobUrl + ' target="_blank">' + sauceJobUrl + '</a>';

            this.attach('Sauce: ' + JSON.stringify(sauceInfo, null, 4));

            world.nemo.saucelabs.updateJob(options)
                .then(handle.onSuccess(callback))
                .thenCatch(callback);
        } else {
            callback();
        }
    });

    // Take Screenshot if scenarios fails and Quit browser
    After(function (scenarioResult, callback) {
        var world = this;

        function attachScreenshot(buffer) {
            return world.attach(new Buffer(buffer, 'base64'), 'image/png');
        }

        function takeScreenshotAndQuit() {
            function quitDriver() {
                return world.nemo.driver.quit();
            }

            if (scenarioResult.isFailed()) {
                return world.nemo.driver.takeScreenshot()
                    .then(attachScreenshot)
                    .then(quitDriver);
            } else {
                return quitDriver();
            }
        }

        if (process.env[Keys.SAUCE]) {
            this.nemo.saucelabs.isJobPassed(!scenarioResult.isFailed());
        }

        takeScreenshotAndQuit()
            .then(handle.onSuccess(callback))
            .thenCatch(callback);
    });

});
