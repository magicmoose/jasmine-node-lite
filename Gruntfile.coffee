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
            options: 
                jshintrc: '.jshintrc'
            lib:
                src: ['lib/**/*.js']

        watch:
            lib:
                files: '<%= jshint.lib.src %>'
                tasks: ['jshint:lib']

    

    # Modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    #Tasks
    grunt.registerTask('default', ['jshint']);

