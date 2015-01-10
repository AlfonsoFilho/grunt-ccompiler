/*
 * grunt-ccompiler
 * https://github.com/alfonso/grunt-ccompiler
 *
 * Copyright (c) 2015 Alfonso Filho
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var shell = require('shelljs'),

      // Compilation levels
      WHITESPACE_ONLY = 'WHITESPACE_ONLY',
      SIMPLE = 'SIMPLE',
      ADVANCED = 'ADVANCED',
      // Parameters
      COMPILATION_LEVEL = "--compilation_level",
      SRC_FILES = "--js",
      DEST_FILE = "--js_output_file";


  // TODO: Improve log notifications messages
  function logError(msg){
    grunt.log.error(msg.red);
  }

  function logSuccess(msg){
    grunt.log.ok(msg.green);
  }

  function getCompilerPath (option) {
    return option.closurePath || process.env.CLOSURE_PATH || false;
  }

  function isArray(value) {
    return Array.isArray(value);
  };

  function getParam(key, value){
    if (typeof value === "string") {
      return key + " " + value;
    } else if(isArray(value)) {
      return value.join(" ");
    }

  }

  function getAllParams(options, src, dest) {
    return " " + [
      getParam(COMPILATION_LEVEL, options.compilation_level),
      getParam(DEST_FILE, dest),
      getParam(SRC_FILES, src)
    ].join(" ");
  }


  function CCompile(){

    var options = this.options({
      closurePath: undefined,
      compilation_level: SIMPLE
    });

    var compilerPath = getCompilerPath(options);

    // If compiler path is not defined, exit task
    if (!compilerPath) {
      logError('Compiler path not defined.');
      return false;
    }


    this.files.forEach(function(f) {

      var cmd = 'java -jar ' + compilerPath + getAllParams(options, f.src, f.dest);

      console.log(cmd);

      // Make sure path to file exists
      grunt.file.write(f.dest, '');

      if(shell.exec(cmd)){
        logSuccess(f.dest + " created!");
      }


    });

  }

  grunt.registerMultiTask('ccompiler', 'Closure Compiler grunt plugin', CCompile);
};
