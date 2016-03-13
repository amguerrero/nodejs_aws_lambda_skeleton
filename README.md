# Node.js AWS Lambda Skeleton

## Directory Structure
This is a structure for a node.js was lambda project solution. In this structure there are the following main directories:
* main/
* test/
* grunt/

### 'main/' directory
This directory includes the node.js lambda function modules that conform the solution and a common/ directory with the common shared functionality to be shared across the solution.
The lambda function modules (i.e. `main/lambdaFunction/`) include a **config/** folder to hold the lambda configuration for the different environments used by the grunt tasks for selecting the config to include on the zip package.

### 'test/' directory
Test directory includes the test specs for the lambda functions. Test specs test the handler modules (i.e. `main/lambdaFunction/LambdaHandler.js`) instead of lambda.js because we can keep lambda.js cleaner and it allows us to expose the handler functions we want to test there and not in the lambda.js itself.

### 'grunt/' directory
This directory includes the grunt tasks to run the tests and build the zip files for every lambda function, so we can deploy them or upload them to an S3 bucket so the can be deployed automatically with a Cloud Formation script.

## Getting Started
First of all, download or fork the repository. Then we need to change to **grunt/** directory and run **npm install** so we have the basic grunt tasks ready to run.

## Build The Solution
For building the solution we will create a new folder in **main/** directory where we will create the node.js aws lambda module and start the npm environment, i.e.:
```
$ mkdir myLambda
$ cd myLambda
$ npm init
```
Then create the test spec in **test/** directory, i.e. (on the last step we were in main/myLambda/ directory):
```
$ cd ../../test/
$ mkdir myLambda
$ touch myLambda-spec.js
```
This sets us ready to develop this piece of the solution in a BDD/TDD way.

To hold the configuration of every environment we need to add a **config-*env*.json** file in the config/ directory, as the grunt tasks that will build the zip file, will use this file to pack and zip the correct config file, i.e.: `config/config-dev.json`

While developing we can run the tests by changing to the **grunt/** directory and run: **grunt jasmine_node**.

## Preparing The Lambdas For Deployment
In order to deploy the lambdas of the solution we need to zip them, for that we need to:
1. Make sure we run **npm install** in the lambda directory, so all the module dependencies will be in **node_modules/** folder, i.e.:
```
$ cd main/myLambda
$ npm install
```
2. Create a new subtask under *compress* task in **Gruntfile.js**. Using the directory name of the lambda as the config key, i.e.:
```
myLambda: { 
    options: { 
            mode: 'zip',
             archive: function() {  
                return "../dist/myLambda.zip”;         
            }     
    },     
    files: [
             { src: ['../main/common/**',
                 "../main/myLambda/config/config.json", 
                "../main/myLambda/node_modules/**", 
                "../main/myLambda/package.json",
                "../main/myLambda/lambda.js",
                "../main/myLambda/MyLambdaHandler.js"] 
             }     
    ]
 }
```
At this point we are able to change to **grunt/** directory and **run grunt buildLambdaZip:*lambda_name*:_env_** to build the lambda zip for the correct environment, i.e.: `grunt buildLambda:myLambda:dev`.

3. In order to be able to build all the lambdas with a single task we need to make the buildLambdaZip task for our lambda to run when the task **buildAllLambdaZips** is run by adding the appropriate **grunt.task.run(...)** call, i.e.: `grunt.task.run('buildLambdaZip:myLambda:’ + env);`

After these three steps we are ready to build a single deployment lambda package or all the deployment lambda packages for the solution, so we are ready to deploy them.

Considerations To Configure The Lambdas
The only consideration regarding the configuration of these lambda packages is that in the AWS Console Lambda Configuration tab, in the Handler configuration it needs to include the full path of the handler function, i.e.: `main/myLambda/lambda.handler`, otherwise the lambda will not be able to find the handler.