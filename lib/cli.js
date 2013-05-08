'use strict';


var cli = require('cli');
var _ = require('lodash');
var glob = require('glob');

var jasmineNodeLite = require('../lib/index');
var options;
var OPTIONS = {
    includeStackTrace: ['stack', 'Enables stack traces on failed tests'],
    consoleReporter: ['consoleReporter', 'Loads the consoleReporter']
};

function run() {
    function onConsoleReporterDone() {
        // body...
    }
    var jasmineOptions = {
        consoleReporterOptions: {
            stackTrace: false,
            onComplete: onConsoleReporterDone
        },
        jasmineNodeLiteOptions: {
            specs: cli.options.resolvedFiles
        }
    };
    console.log(cli.options.resolvedFiles);
    var reporter = new jasmineNodeLite.ConsoleReporter(jasmineOptions.consoleReporterOptions);
    jasmineNodeLite.registerReporter(reporter);

    jasmineNodeLite.executeSpecs(jasmineOptions.jasmineNodeLiteOptions);
}

function interpret(args) {
    cli.setArgv(args);
    cli.enable('version', 'status');
    options = cli.parse(OPTIONS);
    var globbingPatterns = cli.args;
    var resolvedFiles = [];
    function globPattern(pattern) {
        glob(pattern, {
            mark: true,
            sync: true
        }, function result(er, matches) {
            resolvedFiles = _.union(resolvedFiles, matches);
        });
    }
    _.each(globbingPatterns, globPattern);
    // sort
    function comperator(a, b) {
        return a.localeCompare(b);
    }
    resolvedFiles.sort(comperator);
    options.resolvedFiles = resolvedFiles;
    run();
}
module.exports.interpret = interpret;
module.exports.run = run;