var fs = require('fs-sync');

module.exports = function(grunt) {
    grunt.initConfig({
        jasmine_node: {
            options: {
                forceExit: true,
                projectRoot: '..'
            },
            all: '../test'
        },
        compress: {
            lambdaFunction: {
                options: {
                    mode: 'zip',
                    archive: function() {
                        return "../dist/LambdaFunction.zip";
                    }
                },
                files: [
                    { src: ['../main/common/**',
                        "../main/lambdaFunction/config/config.json",
                        "../main/lambdaFunction/node_modules/**",
                        "../main/lambdaFunction/package.json",
                        "../main/lambdaFunction/lambda.js",
                        "../main/lambdaFunction/LambdaHandler.js"] }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('buildLambdaZip', 'Builds the zip file for a single lambda', function(lambdaName, env){
        if (lambdaName === undefined) {
            grunt.log.writeln('Lambda name is mandatory');
            return false
        }
        if (env === undefined) {
            grunt.log.writeln('Environment not set, defaulting to "dev"');
            env = 'dev';
        }

        var envConfigFile = '../main/' + lambdaName + '/config/config-' + env + '.json';
        if (fs.exists(envConfigFile)) {
            fs.copy(envConfigFile, '../main/' + lambdaName + '/config/config.json', {force: true});
        } else {
            console.log('Config file "' + envConfigFile + '" not found...');
            return false;
        }

        grunt.log.writeln('Building zip for ' + lambdaName + ' lambda function in ' + env + ' environment');
        grunt.config('lambdaName', lambdaName);
        grunt.task.run('compress:'+lambdaName);
    });

    grunt.registerTask('buildAllLambdaZips', 'Builds the zip file for all the lambdas', function(env) {
        // Add here all the individual buildLambdaZip call
        grunt.task.run('buildLambdaZip:lambdaFunction:' + env);
    });
}