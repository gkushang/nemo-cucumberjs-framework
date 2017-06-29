'use strict';

module.exports = function loginPage(nemo) {

    var _loginView = nemo.view.addView({

        email: '#email',
        password: '#password',
        login: '#btnLogin',
        captchaEnterCode: 'name:captcha',
        errorNotification: '.notification-critical',
        forgotPasswordLink: '#forgotPasswordModal'

    }, ['loginView'], false);

    function _isCaptchaDisplayed() {
        function isDisplayed(isPresent) {
            return isPresent ? _loginView.captchaEnterCode().isDisplayed() : false;
        }

        return _loginView.captchaEnterCodePresent()
            .then(isDisplayed);
    }

    function _enterCaptchaIfDisplayed(isDisplayed) {
        if (isDisplayed) {
            _loginView.captchaEnterCode()
                .sendKeys('11111111');
        } else {
            return nemo.wd.promise.fulfilled();
        }
    }

    function login(email, password) {
        function _login() {
            _loginView.email().clear();
            _loginView.email().sendKeys(email);
            _loginView.password().clear();
            _loginView.password().sendKeys(password);
            nemo.driver.sleep(1000);
            return _loginView.login().click();
        }

        return _isCaptchaDisplayed()
            .then(_enterCaptchaIfDisplayed)
            .then(_login);
    }

    function getErrorNotification() {
        function getText() {
            return _loginView.errorNotification().getText();
        }

        return _loginView.errorNotificationWaitVisible(nemo.waitTimeOut, 'Error notification was not visible')
            .then(getText);
    }

    function waitTillPageLoads() {
        return _loginView.emailWaitVisible(nemo.waitTimeOut, 'PayPal Login page did not load');
    }

    return {
        login: login,
        getErrorNotification: getErrorNotification,
        waitTillPageLoads: waitTillPageLoads
    }
};
