/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';
var jasmineNodeLite = require('../lib/index');
function onComplete () {
    console.log('done!');
}
var options = {
    stackTrace: false,
    onComplete: onComplete
};

var reporter = new jasmineNodeLite.ConsoleReporter(options);
jasmineNodeLite.registerReporter(reporter);

jasmineNodeLite.executeSpecs(['./spec/sample.spec.js',
    './spec/literatecoffee.spec.litcoffee']);