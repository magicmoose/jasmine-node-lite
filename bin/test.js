/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';

var jasminerunner = require('../lib/jasminerunner');

function onDone () {
    console.log('done!');
}
jasminerunner.executeSpecs(['./spec/sample.spec.js',
    './spec/literatecoffee.spec.litcoffee'],onDone,true, true);