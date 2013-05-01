Console Reporter    
====================

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
                #delete require.cache[require.resolve('../../codec1')]
                
            
            it 'suite started prints the description of the suite', ->
                reportDispatcher.suiteStarted({description:'suiteDescription'})
                expect(output).toEqual(['suiteDescription'])

            it 'spec finished prints the description spec', ->
                reportDispatcher.specDone({description:'specDescription'
                    , status:'passed'})
                expect(output).toEqual(['specDescription'])

            it 'spec finished prints failure and the description of the spec on failed spec', ->
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
                #delete require.cache[require.resolve('../../codec1')]
                
            
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

