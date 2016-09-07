'use strict';

module.exports = function accountPage(nemo) {

    var _accountView = nemo.view.addView({

        logoutClassicView: '.logout',
        logout8BallView: '.nemo_logoutBtn'

    }, ['accountView'], false);

    function waitTillAccountPageLoads() {
        var ERROR_MESSAGE = 'Account page did not load';

        function waitForClassicView() {
            return _accountView.logout8BallViewWaitVisible(nemo.waitTimeOut, ERROR_MESSAGE)
        }

        return _accountView.logoutClassicViewWaitVisible(nemo.waitTimeOut, ERROR_MESSAGE)
            .thenCatch(waitForClassicView);
    }

    return {
        waitTillAccountPageLoads: waitTillAccountPageLoads
    };
};
