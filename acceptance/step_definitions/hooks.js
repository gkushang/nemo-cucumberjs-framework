'use strict';

var handle = require('../helpers/handler');
var cucumberWorld = require('../helpers/world');
var Keys = require('../config/utils/keys');
var sauceConfig = require('../config/sauce.json');

var myHooks = function() {

    var cucumberStepTimeoutInMilliseconds = 400000;

    this.World = cucumberWorld;

    this.setDefaultTimeout(cucumberStepTimeoutInMilliseconds);

    // launch Nemo
    this.Before(function(scenario, callback) {
        var world = this;

        this.scenario = scenario;

        if (this.nemo === undefined) {
            world.World()
                .then(handle.onSuccess(callback))
                .catch(callback);
        } else {
            callback();
        }
    });

    // update SauceLabs dashboard if tests are running on SAUCE
    this.Before(function(scenario, callback) {
        var world = this;
        var sauce = process.env[Keys.SAUCE];

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
    this.After(function(scenario, callback) {
        var world = this;

        function attachScreenshot(buffer) {
            return scenario.attach(new Buffer(buffer, 'base64'), 'image/png');
        }

        function takeScreenshotAndQuit() {
            function quitDriver() {
                return world.nemo.driver.quit();
            }

            if(scenario.isFailed()) {
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

};

module.exports = myHooks;
