'use strict';

// path config
var gulp         = require('gulp');
var minifyHtml   = require("gulp-minify-html");
var replace      = require('gulp-replace');       // use with angular
var gif          = require('gulp-if');

// var cfg = require('../config/gulp');

// Take html created by metalsmith and minfiy it for production


module.exports = function(cfg){

  var wwwDest = cfg.uri[cfg.siteBuild].ghpages;
  var indexHtml = cfg.uri[cfg.siteBuild].indexHtml;

  gulp.task('html', function () {
    // empty - do not remove empty attributes
    // cdata - do not strip CDATA from scripts
    // comments - do not remove comments
    // conditionals - do not remove conditional internet explorer comments
    // spare - do not remove redundant attributes
    // quotes - do not remove arbitrary quotes
    var opts = {spare:true,quotes:true};
    return gulp.src(cfg.common.buildHtml)
      .pipe(gif(cfg.env === 'production', minifyHtml(opts)))
      .pipe(gif(cfg.env === 'production', gulp.dest(wwwDest + '/www')));
  });


  // from angular build -- could be this can be merged
  gulp.task('indexHtml', function () {
    gulp.src(indexHtml)
      .pipe(gulp.dest('build'))
      .pipe(gif(cfg.env === 'production', replace("assets/js/app.js", "assets/js/app.min.js")))
      // .pipe(gif(cfg.env === 'production', replace("assets/css/main.css", "assets/css/main.min.css")))
      .pipe(gif(cfg.env === 'production', gulp.dest(wwwDest + '/www')));
  })

}
