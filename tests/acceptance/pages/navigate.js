'use strict';
var Keys = require('../config/utils/keys');

module.exports = function navigate(nemo) {

    function toLogin() {
        var baseUrl = nemo._config.get(Keys.BASE_URL);
        nemo.scenario.attach('navigate to: ' + baseUrl);
        return nemo.driver.get(nemo._config.get(Keys.BASE_URL));
    }

    return {
        toLogin: toLogin
    }
};
