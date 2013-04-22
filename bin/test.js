/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';

var jasminerunner = require('../lib/jasminerunner');
var consolereporter = require('../lib/reporter/consolereporter');
function onDone () {
    console.log('done!');
}
var options = {
    genericReporter: jasminerunner.GenericJasmineReporter,
    includeStackTrace: false
};

var reporter = new consolereporter.ConsoleReporter(options);

jasminerunner.executeSpecs(['./spec/sample.spec.js',
    './spec/literatecoffee.spec.litcoffee'],onDone);