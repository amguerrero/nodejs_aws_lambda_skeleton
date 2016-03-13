var victim = require('../../main/lambdaFunction/LambdaFunction');
var LambdaHelper = require('../../main/common/LambdaHelper/LambdaHelper');

describe('On Lambda Execution', function() {

    it('Should add the current UTC timestamp to the event', function() {
        spyOn(LambdaHelper, "getCurrentUtcSeconds").andReturn(123456789);
        var event = {
            whatAmI: "I'm an event"
        }

        spyOn(LambdaHelper, "loadConfig").andReturn({ currentEnv: 'unit-test' });

        victim.lambda(event, {succeed: function(ev) {
            console.log(ev);
        }});

        expect(LambdaHelper.getCurrentUtcSeconds).toHaveBeenCalled();
        expect(event['unit-test']).toBe(123456789);
    });
});