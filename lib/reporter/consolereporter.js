/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';

// Requires
var util = require('util');
var _ = require('underscore');

// Implementation
var CONSOLEREPORTEROPTIONS = {
    print: util.print,
    color: true,
    onComplete: function() {},
    includeStackTrace: true
};

var ansi = {
    green: '\u001b[32m',
    red: '\u001b[31m',
    yellow: '\u001b[33m',
    none: '\u001b[0m'
};

function configureEvents(self) {

    function onJasmineStarted() {
        self.print('ConsoleReporter on jasmineStarted\n');
    }

    self.genericReporter.on('jasmineStarted',onJasmineStarted);
}
function ConsoleReporter(options) {
    if (!(this instanceof ConsoleReporter)) {
        return new ConsoleReporter(options);
    }
    _.defaults(options, CONSOLEREPORTEROPTIONS);

    this.print = options.print;
    this.showColors = options.color;
    this.onComplete = options.onComplete;
    this.now = new Date().getTime();
    this.startTime = 0;
    this.specCount = 0;
    this.failureCount = 0;
    //TODO RM:2013-04-20: throw error if no generic reporter
    this.genericReporter = options.genericReporter;
    configureEvents(this);
}

// Module exports

module.exports.ConsoleReporter = ConsoleReporter;