'use strict';

var handle = require('automation-utils').handler;
var cucumberWorld = require('../helpers/world');

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

    this.After(function(scenario, callback) {
        this.nemo.driver.quit()
            .then(handle.onSuccess(callback));
    });

};

module.exports = myHooks;
