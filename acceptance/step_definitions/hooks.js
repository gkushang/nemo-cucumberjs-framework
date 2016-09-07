'use strict';

var handle = require('automation-utils').handler;
var cucumberWorld = require('../helpers/world');
var Keys = require('../config/keys');

var myHooks = function() {

    var cucumberStepTimeoutInMilliseconds = 400000;

    this.World = cucumberWorld;

    this.setDefaultTimeout(cucumberStepTimeoutInMilliseconds);

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

    this.After(function(scenario, callback) {
        this.nemo.driver.quit()
            .then(handle.onSuccess(callback))
            .thenCatch(callback);
    });

};

module.exports = myHooks;
