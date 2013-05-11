/*! jasmine-node-lite - v0.0.4 */
# jasmine-node-lite [![Build Status](https://secure.travis-ci.org/magicmoose/jasmine-node-lite.png?branch=master)](http://travis-ci.org/magicmoose/jasmine-node-lite)
===================

A litewight jasmine node runner.
This is a slim adapter to run Jasmine with node. 

It uses Jasmine2


## Getting Started
Install the module with: `npm install jasmine-node-lite`



Example1
=========

Runs 2 Specs out of the tests of this project.
Run it with

```javascript
coffee doc/example1.litcoffee 
```

We can define the jasmine version to use but this is totally optional. 
If we want to we have to initialize the jasmineoptions module like this:

    jasmineOpt = {
        jasminePath: '../vendor/jasmine/jasmine-2.0.0-alpha'
    }
    require('../lib/jasmineoptions')(jasmineOpt);

Real Projects would require('jasmine-node-lite')

    jasmineNodeLite = require('../lib/index');

This funtion is called after the reporter finished 

    onConsoleReporterDone = () ->
        console.log('ConsoleReporter done!')


Define the options for the Console reporter and jasmine-node-lite

    options = {
        consoleReporterOptions: {
            stackTrace: false,
            onComplete: onConsoleReporterDone
        },
        jasmineNodeLiteOptions:{
            specs: ['./spec/sample.spec.js','./spec/literatecoffee.spec.litcoffee']
        }
    }

Create a Console reporter with the options

    reporter = new jasmineNodeLite.ConsoleReporter(options.consoleReporterOptions)

Register the reporter with jasmineNodeLite

    jasmineNodeLite.registerReporter(reporter);

Execute an array of spec files

    jasmineNodeLite.executeSpecs(options.jasmineNodeLiteOptions)
# Unittests


# Console Reporter
------------------    


Console Reporters are registered with a report Dispatcher which is the component
which interacts with jasmine

    describe 'ConsoleReporter', ->

Tests for the uncolored version

        describe 'Uncolored', ->

            reportDispatcher = new require('../../reportdispatcher').ReportDispatcher()

            consoleReporter = {}
            out = {}
            output = []

            beforeEach () ->
                output = []
                out =
                    println: (str) ->
                        output.push(str)
                        return
                    print: (str) ->
                        #should not be called by reporter
                        return

                consoleReporterOptions =
                    out: out,
                    color: false,
                    onDone: ()->,
                    stackTrace: true

                consoleReporter = new require('../../consolereporter').ConsoleReporter(consoleReporterOptions)
                consoleReporter.OnRegister(reportDispatcher)
                return

            afterEach () ->
                consoleReporter.OnUnregister(reportDispatcher)
                return
                
            
            it 'suite started prints the suite description', ->
                reportDispatcher.suiteStarted({description:'suiteDescription'})
                expect(output).toEqual(['suiteDescription'])

            it 'spec finished prints the spec description', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'passed'})
                expect(output).toEqual(['specDescription'])

            it 'spec finished prints failure andspec description on failed spec', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'failed'})
                expect(output).toEqual(['[failure] specDescription'])

            it 'spec finished prints warning and spec description on pending spec', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'pending'})
                expect(output).toEqual(['[warning] specDescription'])

            it 'suite start increases the indent by 1 level', ->
                reportDispatcher.suiteStarted({description:'suiteDescription'})
                reportDispatcher.suiteStarted({description:'suiteDescription2'})
                expect(output).toEqual(['suiteDescription','    suiteDescription2'])
                
            it 'suite done decreases the indent by 1 level', ->
                reportDispatcher.suiteStarted({description:'suiteDescription'})
                reportDispatcher.suiteDone()
                reportDispatcher.suiteStarted({description:'suiteDescription2'})
                expect(output).toEqual(['suiteDescription','suiteDescription2'])

            it 'suite done decreases the indent by 1 level', ->
                reportDispatcher.suiteStarted({description:'suiteDescription'})
                reportDispatcher.suiteDone()
                reportDispatcher.suiteStarted({description:'suiteDescription2'})
                expect(output).toEqual(['suiteDescription','suiteDescription2'])

            it 'spec started/done also increases and decreases the indent', ->
                reportDispatcher.suiteStarted({description:'suiteDescription'})
                reportDispatcher.specStarted()
                reportDispatcher.specDone({description:'specDescription'
                    , status:'passed'})
                reportDispatcher.suiteDone()
                reportDispatcher.suiteStarted({description:'suiteDescription2'})
                expect(output).toEqual(['suiteDescription','    specDescription'
                    ,'suiteDescription2'])

Tests for the uncolored non verbose version

        describe 'Uncolored nonverbose', ->

            reportDispatcher = new require('../../reportdispatcher').ReportDispatcher()

            consoleReporter = {}
            out = {}
            output = []

NonVerbose uses print instread of println for its output

            beforeEach () ->
                output = []
                out =
                    println: (str) ->
                        #should not be called by reporter
                        return
                    print: (str) ->
                        output.push(str)
                        return

                consoleReporterOptions =
                    out: out,
                    color: false,
                    verbose: false,
                    onDone: ()->,
                    stackTrace: true

                consoleReporter = new require('../../consolereporter').ConsoleReporter(consoleReporterOptions)
                consoleReporter.OnRegister(reportDispatcher)
                return

            afterEach () ->
                consoleReporter.OnUnregister(reportDispatcher)
                return
                
            
            it 'spec finished prints . for success', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'passed'})
                expect(output).toEqual(['.'])

            it 'spec finished prints f for failure', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'failed'})
                expect(output).toEqual(['F'])

            it 'spec finished prints * for pending', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'pending'})
                expect(output).toEqual(['*'])

Tests for the colored version

        describe 'Colored', ->

            reportDispatcher = new require('../../reportdispatcher').ReportDispatcher()

            consoleReporter = {}
            out = {}
            output = []


            beforeEach () ->
                output = []
                out =
                    println: (str) ->
                        output.push(str);
                        return
                    print: (str) ->
                         #should not be called by reporter
                        return

                consoleReporterOptions =
                    out: out,
                    color: true,
                    verbose: true,
                    onDone: ()->,
                    stackTrace: true

                consoleReporter = new require('../../consolereporter').ConsoleReporter(consoleReporterOptions)
                consoleReporter.OnRegister(reportDispatcher)
                return

            afterEach () ->
                consoleReporter.OnUnregister(reportDispatcher)
                return

            it 'suite started prints suite description in color', ->
                reportDispatcher.suiteStarted({description:'suiteDescription'})
                expect(output).toEqual(['\u001b[34msuiteDescription\u001b[0m'])

            it 'spec finished prints spec description in color', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'passed'})
                expect(output).toEqual(['\u001b[32mspecDescription\u001b[0m'])

            it 'spec finished prints spec description on failed spec in color', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'failed'})
                expect(output).toEqual(['\u001b[31mspecDescription\u001b[0m'])

            it 'spec finished prints spec description on pending spec in color', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'pending'})
                expect(output).toEqual(['\u001b[33mspecDescription\u001b[0m'])

And being able to recolor the output

        describe 'Colored redefined', ->

            reportDispatcher = new require('../../reportdispatcher').ReportDispatcher()

            consoleReporter = {}
            out = {}
            output = []


            beforeEach () ->
                output = []
                out =
                    println: (str) ->
                        output.push(str);
                        return
                    print: (str) ->
                         #should not be called by reporter
                        return
                reporter = require('../../consolereporter');
                consoleReporterOptions =
                    out: out,
                    color: true,
                    colorDefinition: {
                        ok: new reporter.OutputFormat('[green]'), 
                        error: new reporter.OutputFormat('[red]', '[failure] '), 
                        warning: new reporter.OutputFormat('[yellow]', '[warning] '), 
                        info: new reporter.OutputFormat('[blue]'), 
                        none: new reporter.OutputFormat('[none]') 
                    },
                    verbose: true,
                    onDone: ()->,
                    stackTrace: true

                consoleReporter = new reporter.ConsoleReporter(consoleReporterOptions)
                consoleReporter.OnRegister(reportDispatcher)
                return

            afterEach () ->
                consoleReporter.OnUnregister(reportDispatcher)
                return

            it 'suite started prints suite description in custom color', ->
                reportDispatcher.suiteStarted({description:'suiteDescription'})
                expect(output).toEqual(['[blue]suiteDescription[none]'])

            it 'spec finished prints spec description in custom color', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'passed'})
                expect(output).toEqual(['[green]specDescription[none]'])

            it 'spec finished prints spec description on failed spec in custom color', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'failed'})
                expect(output).toEqual(['[red]specDescription[none]'])

            it 'spec finished prints spec description on pending spec in custom color', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'pending'})
                expect(output).toEqual(['[yellow]specDescription[none]'])
                
            



## License
Copyright (c) 2013 Ralf Mueller
Licensed under the MIT license.