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
for (var k in jasmineGlobals) {
    global[k] = jasmineGlobals[k];
}

var env = jasmine.getEnv();
var apiReporter = new jasmine.JsApiReporter(jasmine);

var jasmineInterface = {
    describe: function(description, specDefinitions) {
        return env.describe(description, specDefinitions);
    },

    xdescribe: function(description, specDefinitions) {
        return env.xdescribe(description, specDefinitions);
    },

    it: function(desc, func) {
        return env.it(desc, func);
    },

    xit: function(desc, func) {
        return env.xit(desc, func);
    },

    beforeEach: function(beforeEachFunction) {
        return env.beforeEach(beforeEachFunction);
    },

    afterEach: function(afterEachFunction) {
        return env.afterEach(afterEachFunction);
    },

    expect: function(actual) {
        return env.expect(actual);
    },

    addMatchers: function(matchers) {
        return env.addMatchers(matchers);
    },

    spyOn: function(obj, methodName) {
        return env.spyOn(obj, methodName);
    },

    clock: env.clock,
    setTimeout: env.clock.setTimeout,
    clearTimeout: env.clock.clearTimeout,
    setInterval: env.clock.setInterval,
    clearInterval: env.clock.clearInterval,

    jsApiReporter: apiReporter

};

for (var k in jasmineInterface) {
    global[k] = jasmineInterface[k];
}

require('../vendor/jasmine/console/consolereporter');
var coffeeScript = require('coffee-script');

jasmine.executeSpecs = function(specs, done, isVerbose, showColors) {
    var consoleReporter = new jasmine.ConsoleReporter({
        print: util.print,
        onComplete: done,
        showColors: showColors
    });

    env.addReporter(consoleReporter);
    function addSpec (spec) {
        var specPath = path.resolve(spec);
        require(specPath);
    }
    _.each(specs,addSpec);

    env.execute();
};

// Module exports
module.exports.executeSpecs = jasmine.executeSpecs;