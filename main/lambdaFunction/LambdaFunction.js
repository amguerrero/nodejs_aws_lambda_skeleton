"use strict";

var LambdaHelper = require('../common/LambdaHelper/LambdaHelper');
var envConfig = {};

var getConfig = function() {
    return require('./config/config.json');
};

exports.getConfig = getConfig;

exports.lambda = function(event, context) {
    envConfig = LambdaHelper.loadConfig('./config/config.json');
    console.log('Current UTC in seconds in (' + envConfig.currentEnv + '):', LambdaHelper.getCurrentUtcSeconds());
    event[envConfig.currentEnv] = LambdaHelper.getCurrentUtcSeconds();
    context.succeed(event);
};