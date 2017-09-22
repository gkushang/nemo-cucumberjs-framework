'use strict';

var handle = require('../helpers/handler');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, Then, When}) {

    Given(/^Fred wants to login to Gmail$/, function (callback) {
        this.nemo.page.navigate.toLogin()
            .then(this.nemo.page.loginPage.waitTillPageLoads)
            .then(handle.onSuccess(callback))
            .catch(callback);
    });

    When(/^he enters invalid username$/, function (callback) {
        this.nemo.page.loginPage.login('invalid@@something-random.com')
            .then(handle.onSuccess(callback))
            .catch(callback);
    });


    Then(/^he is warned about invalid email or phone$/, function (callback) {
        // Generally, the below "expectedWarningMessage" should be part of localization files
        var expectedWarningMessage = 'Enter a valid email or phone number';

        this.nemo.page.loginPage.getWarningMessage().should.eventually.to
            .equal(expectedWarningMessage, 'Either warning message did not display or was incorrect')
            .notify(callback);
    });

});



