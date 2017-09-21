'use strict';

function onSuccess(callback) {
    return function successHandler() {
        callback();
    }
}

function onError(callback) {
    return function errorHandler(e) {
        if (e) {
            callback(e);
        }
    };
}

module.exports = {
    onSuccess: onSuccess,
    onError: onError
};
