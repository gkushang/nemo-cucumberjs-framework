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

    When(/^he enters invalid (username|phone number)$/, function (usernameOrPhoneNumber, callback) {

        var invalidUser = usernameOrPhoneNumber === 'username' ? 'invalid@@something-random.com' : '000-000-0000';

        this.nemo.page.loginPage.login(invalidUser)
            .then(handle.onSuccess(callback))
            .catch(callback);
    });


    Then(/^he is warned about invalid email or phone$/, function (callback) {

        // Generally, the below "expectedWarningMessage" should be part of localization files
        var expectedWarningMessage = 'Enter a valid email or phone number';
        var errorMessage = 'Either warning message did not display or was incorrect';

        this.nemo.page.loginPage.getWarningMessage().should.eventually.to.equal(expectedWarningMessage, errorMessage)
            .notify(callback);
    });

});



