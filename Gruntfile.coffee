module.exports = (grunt) ->

  # Initialize the configuration.
  grunt.initConfig

      # Linting
      jshint:
        files: ['public/js/**/*.js', 'routes/*.js', 'server.js']
        options:
          jshintrc: '.jshintrc'

      # watch tasks
      watch:
        jshint:
          files: '<%= jshint.files %>'
          tasks: ['jshint']
        options:
          livereload: true

  # Load Grunt ask plugins
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-contrib-watch"

  # Default task
  grunt.registerTask "default", ["jshint", "watch"]