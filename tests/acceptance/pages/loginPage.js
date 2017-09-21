'use strict';

module.exports = function loginPage(nemo) {

    var _loginView = nemo.view.addView({

        email: '#identifierId',
        next: "#identifierNext",
        warning: ".dEOOab.RxsGPe",

    }, ['loginView'], false);

    function login(email) {

        _loginView.email().clear();
        _loginView.email().sendKeys(email);
        nemo.driver.sleep(1000);
        return _loginView.next().click();
    }

    function getWarningMessage() {
        function getText() {
            return _loginView.warning().getText();
        }

        return _loginView.warningWaitVisible(nemo.waitTimeOut, 'Warning message was not visible')
            .then(getText);
    }

    function waitTillPageLoads() {
        return _loginView.emailWaitVisible(nemo.waitTimeOut, 'Login page did not load');
    }

    return {
        login: login,
        getWarningMessage: getWarningMessage,
        waitTillPageLoads: waitTillPageLoads
    }
};
