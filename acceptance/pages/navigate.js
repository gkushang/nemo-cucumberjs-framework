'use strict';
var Keys = require('../config/utils/keys');

module.exports = function navigate(nemo) {

    function toLogin() {
        return nemo.driver.get(nemo._config.get(Keys.BASE_URL));
    }

    return {
        toLogin: toLogin
    }
};
