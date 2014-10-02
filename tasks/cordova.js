'use strict';

var gulp = require('gulp');
var gif = require('gulp-if');
var replace = require('gulp-replace');

// config
// var cfg = require('../config/gulp');


module.exports = function (cfg) {

  var wwwDest = cfg.uri[cfg.siteBuild].ghpages;

  gulp.task('cordova', function() {
    if (cfg.uri[cfg.siteBuild].cordova) {
      return gulp.src(cfg.uri[cfg.siteBuild].cordova)
        .pipe(gif(cfg.env === 'production', gulp.dest(wwwDest)));
    }
    return
  })
}
