module.exports = (grunt) ->

  # Initialize the configuration.
  grunt.initConfig

      # Linting
      jshint:
        files: ['public/js/**/*.js', 'test/*.js', 'routes/*.js', 'server.js']
        options:
          jshintrc: '.jshintrc'

      # watch tasks
      watch:
        jshint:
          files: '<%= jshint.files %>'
          tasks: ['jshint']
        express:
          files: ['server.js', 'routes/*.js', '**/*.jade']
        mochaTest:
          files: ['test/**/*.js']
        options:
          livereload: true

      # express
      express:
        options:
          port: 3000
          debug: true
        server:
          options:
            script: 'server.js'

      mochaTest:
        server:
          options:
            reporter: 'spec'
          src: 'test/server.test.js'


  # Load Grunt ask plugins
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-express-server"
  grunt.loadNpmTasks "grunt-mocha-test"

  # Default task
  grunt.registerTask "default", ["jshint", "express:server", "mochaTest:server", "watch"]
  grunt.registerTask "server", ["express:server", "watch"]
  grunt.registerTask "test", ["express:server", "mochaTest:server"]