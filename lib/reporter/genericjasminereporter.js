/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';

// Requires
var eventemitter2 = require('eventemitter2').EventEmitter2;
var _ = require('underscore');
var util = require('util');

var REPORTERDEFAULTOPTIONS = {
    delimiter: ':',
    maxListeners: 10,
    wildcard: true
};

// Implementation
function GenericJasmineReporter(options) {

    _.defaults(options, REPORTERDEFAULTOPTIONS);

    eventemitter2.call(this, {
        delimiter: options.delimiter,
        wildcard: options.wildcard,
        maxListeners: options.maxListeners
    });
}

util.inherits(GenericJasmineReporter, eventemitter2);

GenericJasmineReporter.prototype.jasmineStarted = function() {
    console.log('GenericJasmineReporter on started');
    this.emit('jasmineStarted');
};

GenericJasmineReporter.prototype.jasmineDone = function() {
    console.log('GenericJasmineReporter on started');
};

GenericJasmineReporter.prototype.suiteStarted = function(result) {
    console.log('GenericJasmineReporter on suiteStarted' + JSON.stringify(result));
};

GenericJasmineReporter.prototype.suiteDone = function(result) {
    console.log('GenericJasmineReporter on suiteDone' + JSON.stringify(result));
};

GenericJasmineReporter.prototype.specStarted = function(result) {
    console.log('GenericJasmineReporter on specStarted' + JSON.stringify(result));
};

GenericJasmineReporter.prototype.specDone = function(result) {
    console.log('GenericJasmineReporter on specDone' + JSON.stringify(result));
};

// Module exports

module.exports.GenericJasmineReporter = GenericJasmineReporter;