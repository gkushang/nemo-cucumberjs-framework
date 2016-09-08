'use strict';

var handle = require('automation-utils').handler;
var cucumberWorld = require('../helpers/world');
var Keys = require('../config/keys');

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

        if (process.env[Keys.SAUCE]) {
            var options = {
                name: scenario.getName(),
                cucumber_tags: scenario.getTags(),
                build: world.nemo._config.get(Keys.BUILD)
            };

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
