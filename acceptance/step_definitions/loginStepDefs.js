'use strict';

var handle = require('../helpers/handler');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, Then, When}) {

    Given(/^Fred wants to login to Gmail$/, function(callback) {
       this.nemo.page.navigate.toLogin()
           .then(this.nemo.page.loginPage.waitTillPageLoads)
           .then(handle.onSuccess(callback))
           .catch(callback);
    });

    When(/^he enters invalid username$/, function(callback) {
        this.nemo.page.loginPage.login('invalid@@something-random.com')
            .then(handle.onSuccess(callback))
            .catch(callback);
    });


    Then(/^he is warned about invalid email or phone$/, function(callback) {
        this.nemo.page.loginPage.getWarningMessage()
            .then(handle.onSuccess(callback))
            .catch(callback);
    });

});



