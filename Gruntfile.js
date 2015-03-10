/*
 * grunt-ccompiler
 * https://github.com/AlfonsoFilho/grunt-ccompiler
 *
 * Copyright (c) 2015 Alfonso Filho
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    ccompiler: {
      default_options: {
        options: {
          closurePath: "test/fixtures/compiler.jar",
          compilation_level: "ADVANCED"
        },
        files: {
          'tmp/default.min.js': ['test/fixtures/first.js', 'test/fixtures/second.js', 'test/fixtures/third.js']
        }
      },
      custom_options: {
        options: {
          closurePath: "test/fixtures/compiler.jar",
          debug: true
        },
        files: {
          'tmp/custom.min.js': ['test/fixtures/first.js', 'test/fixtures/second.js', 'test/fixtures/third.js']
        }
      },
      override_options: {
        options: {
          closurePath: "test/fixtures/compiler.jar",
          override: "--compilation_level WHITESPACE_ONLY --angular_pass"
        },
        files: {
          'tmp/custom.min.js': ['test/fixtures/first.js', 'test/fixtures/second.js', 'test/fixtures/third.js']
        }
      }
    },

    'release-it': {
      options: {
        pkgFiles: ['package.json'],
        commitMessage: 'Release %s',
        tagName: '%s',
        tagAnnotation: 'Release %s',
        buildCommand: false
      }
    }

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release-it');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'ccompiler', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
