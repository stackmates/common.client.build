'use strict';

var gulp         = require('gulp');
var cache        = require('gulp-cached');
var imagemin     = require('gulp-imagemin');
var gif          = require('gulp-if');


module.exports = function(cfg) {

  var wwwDest = cfg.uri[cfg.siteBuild].ghpages;

  gulp.task('images', function() {
    return gulp.src(cfg.uri[cfg.siteBuild].images)
      .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
      .pipe(gulp.dest('build/assets/img'))
      .pipe(gif(cfg.env === 'production', gulp.dest(wwwDest + '/www/assets/img')));
  });

}
