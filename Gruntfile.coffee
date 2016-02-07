module.exports = (grunt) -> 

  _ = require 'lodash'
  
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-include-source'

  grunt.initConfig

    build_dir: 'build'
    compile_dir: 'dist'

    app_files:
      js: [ 'public/**/*.module.js', 'public/**/*.js', '!public/**/*.spec.js', '!public/bower_components/**/*.js' ]
      jsunit: [ 'public/**/*.spec.js', '!public/bower_components/**/*.js' ]

    vendor_files:
      js: [
          'public/bower_components/angular/angular.js',
          'public/bower_components/angular-ui-router/release/angular-ui-router.js',
          'public/bower_components/angular-route/angular-route.js',
          'public/bower_components/alert/index.js',
          'public/bower_components/angular-socket-io/socket.js'
          ]

    pkg: grunt.file.readJSON "package.json"

    clean:
      all: ['<%= build_dir %>', '<%= compile_dir %>']
      vendor: ['<%= build_dir %>/vendor/']

    copy:
      # move our js to build
      appjs:
        files: [{
          src: ['<%= app_files.js %>']
          dest: '<%= build_dir %>/'
          cwd: '.'
          expand: true
        }]

      # move vendor js to build
      vendorjs:
        files: [{
          src: ['<%= vendor_files.js %>']
          dest: '<%= build_dir %>/vendor/'
          cwd: '.'
          expand: true
        }]

    concat:
      # concat our js
      app_js:
        src: ['module.prefix',
              '<%= build_dir %>/public/**/*.js',
              '<%= build_dir %>/public/**/*.module.js',
              'module.suffix']
        dest: '<%= compile_dir %>/<%= pkg.name %>-<%= pkg.version %>.scripts.js'

      # now do the same for the vendor js
      vendor_js:
        src: ['<%= vendor_files.js %>']
        dest: '<%= compile_dir %>/<%= pkg.name %>-<%= pkg.version %>.vendor.js'

    # make sure things are minifiable
    ngAnnotate:
      options:
        singleQuotes: true
      build:
        files: [{
          src: [ '<%= app_files.js %>']
          cwd: '<%= build_dir %>'
          dest: '<%= compile_dir %>/<%= pkg.name %>-<%= pkg.version %>.scripts.js'
        }]

    # minify
    uglify:
      compile:
        files:
          '<%= concat.app_js.dest %>': '<%= concat.app_js.dest %>'
          '<%= concat.vendor_js.dest %>': '<%= concat.vendor_js.dest %>'

    # inject the minifed javascript
    includeSource:
      myTarget:
        files:
          'views/index.jade': 'views/index.jade'

  grunt.registerTask 'build', ['clean', 'copy', 'concat:vendor_js', 'uglify', 'includeSource']
