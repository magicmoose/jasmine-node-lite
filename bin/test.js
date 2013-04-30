/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';

var jasmineNodeLite = require('../lib/index');

function onConsoleReporterDone() {
    console.log('ConsoleReporter done!');
}

var options = {
    consoleReporterOptions: {
        stackTrace: false,
        onComplete: onConsoleReporterDone
    },
    jasmineNodeLiteOptions:{
        specs: ['./spec/samplec.spec.js', './spec/samplea.spec.js','./spec/sampleb.spec.js']
    }
};
console.log('Using Jasmine:' + jasmineNodeLite.jasmineVersion);
var reporter = new jasmineNodeLite.ConsoleReporter(options.consoleReporterOptions);
jasmineNodeLite.registerReporter(reporter);

jasmineNodeLite.executeSpecs(options.jasmineNodeLiteOptions);

options.jasmineNodeLiteOptions.specs = ['./spec/literatecoffee.spec.litcoffee'];
jasmineNodeLite.executeSpecs(options.jasmineNodeLiteOptions);