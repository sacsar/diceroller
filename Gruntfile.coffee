
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

      # express
      express:
        options:
          port: 9000
          hostname: '*'
        livereload:
          options:
            server: 'server.js'
            livereload: true
            serverreload: true

  # Load Grunt ask plugins
  grunt.loadNpmTasks "grunt-contrib-jshint"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-express"

  # Default task
  grunt.registerTask "default", ["jshint", "watch"]

  grunt.registerTask "server", ["express:livereload", "watch"]