module.exports = (grunt) ->

    # Package
    # =======

    pkg = require './package.json'

    # Configuration
    # =============
    grunt.initConfig

        # Package
        # -------
        pkg: pkg

        jshint:     
            lib: ['lib/**/*.js']
            options: 
                jshintrc: '.jshintrc'

        watch:
            lib:
                files: '<%= jshint.lib.src %>'
                tasks: ['jshint:lib']

    

    # Modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    #Tasks
    grunt.registerTask('default', ['jshint']);

