Example1
=========

Runs 2 Specs out of the tests of this project.
Run it with

```javascript
coffee doc/example1.litcoffee 
```


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