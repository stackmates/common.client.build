'use strict';


// TODO http://stackoverflow.com/questions/20158401/how-do-i-manage-relative-path-aliasing-in-multiple-grunt-browserify-bundles/23608416#23608416


var gulp            = require('gulp');
var concat          = require('gulp-concat');
var gif             = require('gulp-if');
var gutil           = require('gulp-util');
var rename          = require('gulp-rename');


// scripts browserify
var source          = require('vinyl-source-stream');
var browserify      = require('browserify');
var watchify        = require('watchify');
var browserifyShim  = require('browserify-shim');

// load transforms
var brfs            = require('brfs');
var hbsfy           = require('hbsfy');
var famousify       = require('famousify');
var coffeeify       = require('coffeeify');

// Minify your browserify bundles without losing the sourcemap
var minifyify       = require('minifyify');

// utils
var bundleLogger     = require('./util/bundleLogger');
var handleErrors     = require('./util/handleErrors');


// angular  // TODO change this for annotate
// var ngmin            = require('gulp-ngmin'); // deprecated
var ngAnnotate       = require('gulp-ng-annotate');
var uglify           = require('gulp-uglify');


// build config
var cfg              = require('../config/gulp');
var wwwDir           = cfg.uri[cfg.siteBuild].ghpages;
var entryPoint       = cfg.uri[cfg.siteBuild].browserifyEntry;



function browserifyBundle () {

  var bundleMethod = cfg.watch ? watchify : browserify;
  // var bundleMethod = browserify;

  var bundler = bundleMethod({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Specify the entry point of your app
    entries: entryPoint,
    // Add file extentions to make optional in your requires
    extensions: ['.js', '.coffee', 'html'],
    paths: ['./node_modules','./src/common/']
  });

  bundler.transform('brfs');

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      // Enable source maps!
      .bundle({
        debug: true
      })
      // Report compile errors
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      // .pipe(brfs())
      .pipe(source('app.js'))
      .pipe(gulp.dest('build/assets/js'))
      // Log when bundling completes!
      .on('end', bundleLogger.end);
  };

  if(cfg.watch) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();

};


// todo send in arrays for processing
gulp.task('scriptsAngular', ['browserifyAngular'],  function () {
  return gulp.src('./build/assets/js/app.js')
    .pipe(gif(cfg.env === 'production', rename({suffix: '.min'})))
    .pipe(gif(cfg.env === 'production', ngAnnotate()))
    .pipe(gif(cfg.env === 'production', uglify({preserveComments: 'some'})))
    .pipe(gif(cfg.env === 'production', gulp.dest(wwwDir + '/www/assets/js')))
  // body...
})

gulp.task('scripts', ['browserifySite'],  function () {
  return gulp.src('./build/assets/js/app.js')
    // .pipe(gif(cfg.env === 'production', rename({suffix: '.min'})))
    .pipe(gif(cfg.env === 'production', uglify()))
    .pipe(gif(cfg.env === 'production', gulp.dest(wwwDir + '/www/assets/js')))
  // body...
})

gulp.task('browserifySite', browserifyBundle );
gulp.task('browserifyAngular', ['templates'] , browserifyBundle );


// gulp.task('watch', function() {
//   var bundler = watchify(browserify('src/index.js', watchify.args));

//   // Optionally, you can apply transforms
//   // and other configuration options on the
//   // bundler just as you would with browserify
//   bundler.transform('brfs');

//   bundler.on('update', rebundle);

//   function rebundle() {
//     return bundler.bundle()
//       // log errors if they happen
//       .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//       .pipe(source('bundle.js'))
//       .pipe(gulp.dest('./dist'));
//   }

//   return rebundle();
// });
