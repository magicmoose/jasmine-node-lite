/**
 *  This file is subject to the terms and conditions defined in the file
 *  'LICENCE.md', which is part of this source code package.
 *  @author Ralf Mueller
 */

'use strict';

// Requires
var jasmineGlobals = require('../vendor/jasmine/jasmine-2.0.0-alpha');
var util = require('util');
var _ = require('underscore');
var path = require('path');

// Implementation

// bring jasmine globals into current scope
for (var k in jasmineGlobals) {
    global[k] = jasmineGlobals[k];
}
// just asign the global to a var to make lint happy
var jasmine = global.jasmine;

var jasmineEnv = jasmine.getEnv();

var apiReporter = new jasmine.JsApiReporter(jasmine);

function registerJasmineInterface() {
    var jasmineInterface = {
        describe: function (description, specDefinitions) {
            return jasmineEnv.describe(description, specDefinitions);
        },

        xdescribe: function (description, specDefinitions) {
            return jasmineEnv.xdescribe(description, specDefinitions);
        },

        it: function (desc, func) {
            return jasmineEnv.it(desc, func);
        },

        xit: function (desc, func) {
            return jasmineEnv.xit(desc, func);
        },

        beforeEach: function (beforeEachFunction) {
            return jasmineEnv.beforeEach(beforeEachFunction);
        },

        afterEach: function (afterEachFunction) {
            return jasmineEnv.afterEach(afterEachFunction);
        },

        expect: function (actual) {
            return jasmineEnv.expect(actual);
        },

        addMatchers: function (matchers) {
            return jasmineEnv.addMatchers(matchers);
        },

        spyOn: function (obj, methodName) {
            return jasmineEnv.spyOn(obj, methodName);
        },

        clock: jasmineEnv.clock,
        setTimeout: jasmineEnv.clock.setTimeout,
        clearTimeout: jasmineEnv.clock.clearTimeout,
        setInterval: jasmineEnv.clock.setInterval,
        clearInterval: jasmineEnv.clock.clearInterval,

        jsApiReporter: apiReporter

    };

    for (var k in jasmineInterface) {
        global[k] = jasmineInterface[k];
    }
}

registerJasmineInterface();

require('../vendor/jasmine/console/consolereporter');
require('coffee-script');

jasmine.executeSpecs = function (specs, done, isVerbose, showColors) {
    var consoleReporter = new jasmine.ConsoleReporter({
        print: util.print,
        onComplete: done,
        showColors: showColors
    });

    jasmineEnv.addReporter(consoleReporter);
    function addSpec(spec) {
        var specPath = path.resolve(spec);
        require(specPath);
    }
    _.each(specs, addSpec);

    jasmineEnv.execute();
};

// Module exports
module.exports.executeSpecs = jasmine.executeSpecs;