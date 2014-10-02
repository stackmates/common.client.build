'use strict';

// path config
// var cfg = require('../config/gulp');

var gulp = require('gulp');

// publish
var bump = require('gulp-bump');
var git = require('gulp-git');


module.exports = function(cfg){

  var wwwDest = cfg.uri[cfg.siteBuild].ghpages;

  // update versions TODO
  gulp.task('bump', function () {
    return gulp.src(['./package.json'])
      .pipe(bump())
      .pipe(gulp.dest('./'));
  });

  git commit
  gulp.task('tag', ['bump'], function () {
    var pkg = require('./package.json');
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;

    return gulp.src(wwwDest)
      .pipe(git.commit(message))
      .pipe(git.tag(v, message))
      .pipe(git.push('origin', 'master', '--tags'))
      .pipe(gulp.dest(wwwDest));
  });

};
