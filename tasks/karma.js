'use strict';

// gulp and general utils
var gulp   = require('gulp');
var _      = require('lodash');
var source = require('vinyl-source-stream');
var glob   = require('glob');

var browserify = require('browserify');

// karma
var karma = require('karma').server;
var karmaCommonConf = require('../config/karma.js');


module.exports = function(cfg) {

  // use browserify to make one big test file then run karma on that
  // full credit to gah-boh; https://github.com/xdissent/karma-browserify/issues/38
  gulp.task('browserifySpecs', function() {

    var testFiles = glob.sync(cfg.uri[cfg.siteBuild].browserifySpecs);

    var bundleStream = browserify({
      entries: testFiles,
      extensions: ['.js', '.coffee'],
      paths: ['./node_modules','./src/common/']
    })
    .bundle({debug: true});


    return bundleStream
      .pipe(source('bundle-tests.js'))
      .pipe(gulp.dest('test/build'));
  });


  gulp.task('karma', ['browserifySpecs'], function(done) {
    karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
  });

  gulp.task('karma-watch', function(done) {
    karma.start(_.assign({}, karmaCommonConf, {singleRun: false}), done);
  });

}
