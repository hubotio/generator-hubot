'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-release');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'coffee-script'
        },
        src: ['test/**/*.coffee','test/**/*.js']
      }
    },
    release: {
      options: {
        tagName: 'v<%= version %>',
        commitMessage: 'Prepared to release <%= version %>.'
      }
    },
    watch: {
      files: ['Gruntfile.js', 'test/**/*.coffee'],
      tasks: ['test']
    }
  });
  // load all grunt-plugin tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
