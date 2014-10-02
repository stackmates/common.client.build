'use strict';

// standards
var gulp                          = require('gulp');
var gif                           = require('gulp-if');
var rename                        = require('gulp-rename');
var size                          = require('gulp-size');

var sass                          = require('gulp-sass');
var concat                        = require('gulp-concat');
var csso                          = require('gulp-csso'); // minify
// var uncss                      = require('gulp-uncss');


// build configuration
// var cfg                           = require('../config/gulp');

/**
 * Build  CSS
 */

module.exports = function(cfg) {

  var wwwDir         = cfg.uri[cfg.siteBuild].ghpages;
  var styleEntry     = cfg.uri[cfg.siteBuild].styleEntry;

  gulp.task('sass', function() {
    return gulp.src(styleEntry)
      .pipe(sass({
        // Normally, gulp-sass exits on error. This is good during normal builds.
        // During watch builds, we only want to log the error.
        errLogToConsole: cfg.watch
      }))
      .pipe(concat('main.css'))
      .pipe(gulp.dest('build/assets/css'))
      .pipe(gif(cfg.env === 'production', csso(true)))
      .pipe(rename({ extname: '.min.css' }))  // what is the point of this really?
      .pipe(size({title: 'styles:css'}))
      .pipe(gulp.dest(wwwDir + '/www/assets/css'));
  });

}
// Automatically Prefix CSS
// this is the webkit way
// gulp.task('styles:css', function () {
//   return gulp.src('app/styles/**/*.css')
//     .pipe($.changed('app/styles'))
//     .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
//     .pipe(gulp.dest('app/styles'))
//     .pipe($.size({title: 'styles:css'}));
// });

// // Compile Sass For Style Guide Components (app/styles/components)
// gulp.task('styles:components', function () {
//   return gulp.src('app/styles/components/components.scss')
//     .pipe($.rubySass({
//       style: 'expanded',
//       precision: 10,
//       loadPath: ['app/styles/components']
//     }))
//     .on('error', console.error.bind(console))
//     .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
//     .pipe(gulp.dest('app/styles/components'))
//     .pipe($.size({title: 'styles:components'}));
// });

// // Compile Any Other Sass Files You Added (app/styles)
// gulp.task('styles:scss', function () {
//   return gulp.src(['app/styles/**/*.scss', '!app/styles/components/components.scss'])
//     .pipe($.rubySass({
//       style: 'expanded',
//       precision: 10,
//       loadPath: ['app/styles']
//     }))
//     .on('error', console.error.bind(console))
//     .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
//     .pipe(gulp.dest('.tmp/styles'))
//     .pipe($.size({title: 'styles:scss'}));
// });

// // Output Final CSS Styles
// gulp.task('styles', ['styles:components', 'styles:scss', 'styles:css']);


// from start ionic
// module.exports = gulp.task('styles', function () {
//   return gulp.src(cfg.app.styles)
//     .pipe(sass())
//     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(gulp.dest(cfg.buildDir + '/assets/css'))
//     .pipe(gif(cfg.env === 'production', rename({suffix : '.min'})))
//     .pipe(gif(cfg.env === 'production', csso(true)))
//     .pipe(gif(cfg.env === 'production', gulp.dest(cfg.compileDir + '/assets/css')));
// });
