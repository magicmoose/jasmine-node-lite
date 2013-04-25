/*! jasmine-node-lite - v0.0.2 */
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
If we want to we:

    jasmineOpt = {
        jasminePath: '../lib/vendor/jasmine/jasmine-2.0.0-alpha'
    }
    require('../lib/jasmineoptions')(jasmineOpt);

Real Projects would require('jasmine-node-lite')

    jasmineNodeLite = require('../lib/index');

This funtion is called after the reporter finished 

    onComplete = () ->
        console.log('done!')


Define the options for the Console reporter 

     options = {
        stackTrace: false,
        onComplete: onComplete
    }

Create a Console reporter with the options

    reporter = new jasmineNodeLite.ConsoleReporter(options)

Register the reporter with jasmineNodeLite

    jasmineNodeLite.registerReporter(reporter);

Execute an array of spec files

    jasmineNodeLite.executeSpecs(['./spec/sample.spec.js',
        './spec/literatecoffee.spec.litcoffee'])

## License
Copyright (c) 2013 Ralf Mueller
Licensed under the MIT license.