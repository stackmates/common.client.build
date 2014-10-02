'use strict';

var runSequence = require('run-sequence');

var gulp = require('gulp');
var cache = require('gulp-cached');
var imagemin = require('gulp-imagemin');
var gif = require('gulp-if');
var replace = require('gulp-replace');

// config
// var cfg = require('../config/gulp');


module.exports = function (cfg) {

  var wwwDest = cfg.uri[cfg.siteBuild].ghpages;

  gulp.task('assets', function(callback) {
    runSequence (
      ['icons','fonts', 'data','cname'],
      ['meta'],
      callback
    );
  });

  gulp.task('icons', function() {
    return gulp.src(cfg.uri[cfg.siteBuild].icons)
      //.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
      .pipe(gulp.dest('build/assets/icons'))
      .pipe(gif(cfg.env === 'production', gulp.dest(wwwDest + '/www/assets/icons')));
  });

  gulp.task('fonts', function() {
    return gulp.src(cfg.uri[cfg.siteBuild].fonts)
      .pipe(gulp.dest('build/assets/fonts'))
      .pipe(gif(cfg.env === 'production', gulp.dest(wwwDest +  '/www/assets/fonts')));
  });

  gulp.task('data', function() {
    return gulp.src(cfg.uri[cfg.siteBuild].data)
      .pipe(gulp.dest('build/assets/data'))
      .pipe(gif(cfg.env === 'production', gulp.dest(wwwDest +  '/www/assets/data')));
  });

  gulp.task('cname', function() {
    gulp.src([cfg.uri[cfg.siteBuild].meta + '/CNAME'])
      .pipe(replace(/.*[\.]+.*/g, cfg.uri[cfg.siteBuild].baseURL ))
      .pipe(gulp.dest(cfg.uri[cfg.siteBuild].meta));
  });

  gulp.task('meta', function() {
    return gulp.src(cfg.uri[cfg.siteBuild].meta + '/**/*')
      .pipe(gulp.dest('build'))
      .pipe(gif(cfg.env === 'production', gulp.dest(wwwDest + '/www')));
  });


}
