'use strict';

var handle = require('../../helpers/handler');
var Keys = require('../../config/utils/keys');
var sauceConfig = require('../../config/sauce.json');
var chai = require('chai');
var chaiAsPromise = require('chai-as-promised');
var should = chai.should();

var {defineSupportCode} = require('cucumber');

chai.use(chaiAsPromise);

defineSupportCode(function ({Before, After, setDefaultTimeout}) {

    var cucumberStepTimeoutInMilliseconds = 400000;

    setDefaultTimeout(cucumberStepTimeoutInMilliseconds);

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

        function updateSauceLabsJob() {
            return world.nemo.saucelabs.updateJob(options);
        }

        function printSauceInfo() {
            var sauceInfo = sauceConfig[sauce].driver.serverCaps;

            return world.nemo.saucelabs.getJobUrl()
                .then(function (url) {
                    sauceInfo.url = '<a href=' + url + ' target="_blank">' + url + '</a>';
                    return sauceInfo;
                }).then(function (sauceInfo) {
                    return world.attach('Sauce: ' + JSON.stringify(sauceInfo, null, 4));
                });
        }

        if (sauce) {

            var options = {
                name: scenarioResult.scenario.name,
                cucumber_tags: scenarioResult.scenario.tags,
                build: world.nemo._config.get(Keys.BUILD)
            };

            printSauceInfo()
                .then(updateSauceLabsJob)
                .then(handle.onSuccess(callback))
                .catch(callback);

        } else {
            this.attach('Browser: ' + world.nemo._config.get(Keys.BROWSER));
            callback();
        }
    });


    // navigate to sign up in hooks
    Before({tags: "@sign_up"}, function (callback) {
        this.nemo.page.navigate.toLogin()
            .then(handle.onSuccess(callback))
            .catch(callback);
    });

    // Take Screenshot if scenarios fails and Quit browser
    After(function (scenarioResult, callback) {
        var world = this;
        var PASSED = 'passed';

        function attachScreenshot(buffer) {
            return world.attach(buffer, 'image/png');
        }

        function takeScreenshotAndQuit() {
            function quitDriver() {
                return world.nemo.driver.quit();
            }

            if (scenarioResult.status !== PASSED) {
                return world.nemo.driver.takeScreenshot()
                    .then(attachScreenshot)
                    .then(quitDriver);
            } else {
                return quitDriver();
            }
        }

        if (process.env[Keys.SAUCE]) {
            this.nemo.saucelabs.isJobPassed(scenarioResult.status === PASSED);
        }

        takeScreenshotAndQuit()
            .then(handle.onSuccess(callback))
            .catch(callback);
    });

});
