/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';

// Requires
var util = require('util');
var _ = require('lodash');

// Implementation
var CONSOLEREPORTEROPTIONS = {
    print: util.print,
    color: true,
    onDone: function() {},
    stackTrace: true
};

var _Display = {
    ok: '\u001b[32m', // green
    error: '\u001b[31m', // red
    warning: '\u001b[33m', // yellow
    info: '\u001b[34m', //blue
    none: '\u001b[0m' // none
};

var INDENT = '    ';

function getIndent(index) {
    var indent = '';
    for (var i = 0; i < index; i++) {
        indent += INDENT;
    }
    return indent;
}

function repeat(thing, times) {
    var arr = [];
    for (var i = 0; i < times; i++) {
        arr.push(thing);
    }
    return arr;
}

function stackIndent(str, spaces) {
    var lines = (str || '').split('\n');
    var newArr = [];
    for (var i = 0; i < lines.length; i++) {
        newArr.push(repeat(' ', spaces).join('') + lines[i]);
    }
    return newArr.join('\n');
}

function registerEvent(self, reportDispatcher, event, listener) {
    var eventDescriptor = {
        event: event,
        listener: listener
    };

    self.registeredEvents.push(eventDescriptor);

    reportDispatcher.on(event, listener);
}

function configureEvents(self, reportDispatcher) {
    function colored(displayType, str) {
        return self.showColors ? (displayType + str + _Display.none) : str;
    }

    function onJasmineStarted() {
        self.startTime = self.now();
        self.specCount = 0;
        self.failureCount = 0;
        self.failedSpecs = [];
        self.indent = 0;
    }

    function reportFailures() {
        self.print('Failures:\n');
        for (var i = 0; i < self.failedSpecs.length; i++) {
            var failedSpec = self.failedSpecs[i];
            self.print('  ' + (i + 1) + ') ' + failedSpec.fullName + '\n');
            for (var j = 0; j < failedSpec.failedExpectations.length; j++) {
                var failedExpectation = failedSpec.failedExpectations[j];
                self.print('   Message:\n');
                self.print(colored(_Display.error, '     ' + failedExpectation.message + '\n'));
                if (self.stackTrace) {
                    self.print('   Stacktrace:\n');
                    self.print(stackIndent(failedExpectation.stack), 4);
                }
                self.print('\n\n');
            }
        }
    }

    function onJasmineDone() {
        reportFailures();
        var message = '\n' + self.specCount + ' spec' + (self.specCount === 1 ? '' : 's') +
            ', ' + self.failureCount + ' failure' + ((self.failureCount === 1) ? '' : 's') + '\n';
        self.print(colored(self.failureCount === 0 ? _Display.ok : _Display.error, message));
        self.onComplete();
    }

    function onSuiteStarted(result) {
        self.print(colored(_Display.info, getIndent(self.indent) + result.description + '\n'));
        self.indent++;
    }

    function onSuiteDone( /*result*/ ) {
        self.indent--;
    }

    function onSpecStarted( /*result*/ ) {
        self.indent++;
    }

    function onSpecDone(result) {
        self.specCount++;
        self.indent--;
        // if (result.status === "pending") {
        //     //print(colored("yellow", "*"));
        // }

        if (result.status === 'passed') {
            self.print(colored(_Display.ok, getIndent(self.indent) + result.description + '\n'));
        }

        if (result.status === 'failed') {
            self.failureCount++;
            self.failedSpecs.push(result);
            self.print(colored(_Display.error, getIndent(self.indent) + result.description + '\n'));
        }

    }


    registerEvent(self, reportDispatcher, 'jasmineStarted', onJasmineStarted);
    registerEvent(self, reportDispatcher, 'jasmineDone', onJasmineDone);
    registerEvent(self, reportDispatcher, 'suiteStarted', onSuiteStarted);
    registerEvent(self, reportDispatcher, 'suiteDone', onSuiteDone);
    registerEvent(self, reportDispatcher, 'specStarted', onSpecStarted);
    registerEvent(self, reportDispatcher, 'specDone', onSpecDone);
}

function ConsoleReporter(options) {
    if (!(this instanceof ConsoleReporter)) {
        return new ConsoleReporter(options);
    }

    function now() {
        return new Date().getTime();
    }
    _.defaults(options, CONSOLEREPORTEROPTIONS);

    this.print = options.print;
    this.showColors = options.color;
    this.onComplete = options.onComplete;
    this.now = now;
    this.startTime = 0;
    this.specCount = 0;
    this.failureCount = 0;
    this.failedSpecs = [];
    this.registeredEvents = [];
    this.indent = 0;
    this.stackTrace = options.stackTrace;
}

ConsoleReporter.prototype.OnRegister = function(reportDispatcher) {
    configureEvents(this, reportDispatcher);
};

ConsoleReporter.prototype.OnUnregister = function(reportDispatcher) {
    function unregister(eventDescriptor) {
        reportDispatcher.off(eventDescriptor.event, eventDescriptor.listener);
    }

    _(this.registeredEvents).each(unregister);
};
// Module exports

module.exports.ConsoleReporter = ConsoleReporter;