'use strict';

var gulp         = require('gulp');
var cache        = require('gulp-jshint');

module.exports = function(cfg) {

  // Lint JavaScript
  gulp.task('jshint', function () {
    return gulp.src(cfg.uri[cfg.siteBuild].watchJS)
      .pipe(reload({stream: true, once: true}))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
  });

}
