'use strict';

var handle = require('../../helpers/handler');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, Then, When}) {

    Given(/^Fred wants to login to PayPal$/, function(callback) {
       this.nemo.page.navigate.toLogin()
           .then(this.nemo.page.loginPage.waitTillPageLoads)
           .then(handle.onSuccess(callback))
           .catch(callback);
    });

    When(/^he enters valid credentials$/, function(callback) {
        this.nemo.page.loginPage.login('xyz@paypal.com', 'stage2@qa')
            .then(handle.onSuccess(callback))
            .catch(callback);
    });

    When(/^he enters invalid credentials$/, function(callback) {
        this.nemo.page.loginPage.login('invalid@email.com', 'invalid-password')
            .then(handle.onSuccess(callback))
            .catch(callback);
    });

    Then(/^he is not able to login$/, function(callback) {
        this.nemo.page.loginPage.getErrorNotification()
            .then(handle.onSuccess(callback))
            .catch(callback);
    });

    Then(/^he is able to view his account$/, function(callback) {
        this.nemo.page.accountPage.waitTillAccountPageLoads()
            .then(handle.onSuccess(callback))
            .catch(callback);
    });
});



