"use strict";

exports.loadConfig = function(configFile) {
    return require(configFile);
};

exports.getCurrentUtcSeconds = function() {
    var now = new Date();
    return parseInt(new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()).getTime() / 1000);
}