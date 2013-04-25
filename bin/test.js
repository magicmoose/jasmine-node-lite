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
        specs: ['./spec/sample.spec.js','./spec/literatecoffee.spec.litcoffee']
    }
};

var reporter = new jasmineNodeLite.ConsoleReporter(options.consoleReporterOptions);
jasmineNodeLite.registerReporter(reporter);

jasmineNodeLite.executeSpecs(options.jasmineNodeLiteOptions);