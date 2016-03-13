"use strict";

var NewLeadHandler = require('./LambdaFunction');

exports.handler = function(event, context) {
    NewLeadHandler.lambda(event, context);
};