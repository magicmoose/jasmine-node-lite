/*! jasmine-node-lite - v0.0.3 */
# jasmine-node-lite [![Build Status](https://secure.travis-ci.org/magicmoose/jasmine-node-lite.png?branch=master)](http://travis-ci.org/magicmoose/jasmine-node-lite)
===================

A litewight jasmine node runner.
This is a slim adapter to run Jasmine with node. 

It uses Jasmine2


## Getting Started
Install the module with: `npm install jasmine-node-lite`



Example1
=========

Runs 2 Specs out of the tests of this project.
Run it with

```javascript
coffee doc/example1.litcoffee 
```

We can define the jasmine version to use but this is totally optional. 
If we want to we have to initialize the jasmineoptions module like this:

    jasmineOpt = {
        jasminePath: '../vendor/jasmine/jasmine-2.0.0-alpha'
    }
    require('../lib/jasmineoptions')(jasmineOpt);

Real Projects would require('jasmine-node-lite')

    jasmineNodeLite = require('../lib/index');

This funtion is called after the reporter finished 

    onConsoleReporterDone = () ->
        console.log('ConsoleReporter done!')


Define the options for the Console reporter and jasmine-node-lite

    options = {
        consoleReporterOptions: {
            stackTrace: false,
            onComplete: onConsoleReporterDone
        },
        jasmineNodeLiteOptions:{
            specs: ['./spec/sample.spec.js','./spec/literatecoffee.spec.litcoffee']
        }
    }

Create a Console reporter with the options

    reporter = new jasmineNodeLite.ConsoleReporter(options.consoleReporterOptions)

Register the reporter with jasmineNodeLite

    jasmineNodeLite.registerReporter(reporter);

Execute an array of spec files

    jasmineNodeLite.executeSpecs(options.jasmineNodeLiteOptions)

## License
Copyright (c) 2013 Ralf Mueller
Licensed under the MIT license.