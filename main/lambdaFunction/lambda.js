"use strict";

var NewLeadHandler = require('./LambdaHandler');

exports.handler = function(event, context) {
    NewLeadHandler.lambda(event, context);
};