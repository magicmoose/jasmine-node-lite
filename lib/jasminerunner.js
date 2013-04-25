/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';

// Requires

require('coffee-script');
var jasmineoptions = require('./jasmineoptions')({});
var jasmineGlobals = require(jasmineoptions.getJasminePath());
var _ = require('underscore');
var path = require('path');
var reportDispatcher = require('./reporter/reportDispatcher');

// Implementation

// bring jasmine globals into current scope
for (var k in jasmineGlobals) {
    global[k] = jasmineGlobals[k];
}
// just asign the global to a var to make lint happy
var jasmine = global.jasmine;

var jasmineEnv = jasmine.getEnv();


function registerJasmineInterface() {
    var jasmineInterface = {
        describe: function(description, specDefinitions) {
            return jasmineEnv.describe(description, specDefinitions);
        },

        xdescribe: function(description, specDefinitions) {
            return jasmineEnv.xdescribe(description, specDefinitions);
        },

        it: function(desc, func) {
            return jasmineEnv.it(desc, func);
        },

        xit: function(desc, func) {
            return jasmineEnv.xit(desc, func);
        },

        beforeEach: function(beforeEachFunction) {
            return jasmineEnv.beforeEach(beforeEachFunction);
        },

        afterEach: function(afterEachFunction) {
            return jasmineEnv.afterEach(afterEachFunction);
        },

        expect: function(actual) {
            return jasmineEnv.expect(actual);
        },

        addMatchers: function(matchers) {
            return jasmineEnv.addMatchers(matchers);
        },

        spyOn: function(obj, methodName) {
            return jasmineEnv.spyOn(obj, methodName);
        },

        clock: jasmineEnv.clock,
        setTimeout: jasmineEnv.clock.setTimeout,
        clearTimeout: jasmineEnv.clock.clearTimeout,
        setInterval: jasmineEnv.clock.setInterval,
        clearInterval: jasmineEnv.clock.clearInterval

    };

    for (var k in jasmineInterface) {
        global[k] = jasmineInterface[k];
    }
}

registerJasmineInterface();

// register the report dispatcher
var _reportDispatcher = new reportDispatcher.ReportDispatcher({});
jasmineEnv.addReporter(_reportDispatcher);

var JASMINEOPTIONS = {
    specs:[]
};

/**
 * Executes the Jasmine specs
 * @param  options
 */
jasmine.executeSpecs = function(options) {
    function addSpec(spec) {
        var specPath = path.resolve(spec);
        require(specPath);
    }
    _.defaults(options, JASMINEOPTIONS);
    _.each(options.specs, addSpec);

    jasmineEnv.execute();
};

function registerReporter (reporter) {
    reporter.OnRegister(_reportDispatcher);
}

// Module exports
module.exports.executeSpecs = jasmine.executeSpecs;
module.exports.registerReporter = registerReporter;