/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';

var jasminerunner = require('../lib/jasminerunner');
var consolereporter = require('../lib/reporter/consolereporter');
function onComplete () {
    console.log('done!');
}
var options = {
    stackTrace: false,
    onComplete: onComplete
};

var reporter = new consolereporter.ConsoleReporter(options);
jasminerunner.registerReporter(reporter);

jasminerunner.executeSpecs(['./spec/sample.spec.js',
    './spec/literatecoffee.spec.litcoffee']);