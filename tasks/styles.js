'use strict';

var gulp                          = require('gulp');
var gif                           = require('gulp-if');
var rename                        = require('gulp-rename');
var size                          = require('gulp-size');

var autoprefixer                  = require('gulp-autoprefixer');
var csso                          = require('gulp-csso');

// keep an eye on the follow for advancements in rework
// myth.io
// topcoat.io https://github.com/topcoat
// moox: https://www.npmjs.org/~moox
// https://www.npmjs.org/search?q=rework
// https://github.com/reworkcss/rework

// the daddy
var rework                        = require('gulp-rework');
// Import CSS from npm modules using rework
var npm                           = require('rework-npm');
// variable names
var vars                          = require('rework-vars');
// @dam, remove duplicate css
var dedupe                        = require('rework-deduplicate');

// @myth, add support for the W3C-style CSS Custom Media Queries syntax.
// var customMedia                   = require('rework-custom-media');  25/07/14 did not work
// TODO replace with customMedia
var breakpoints                   = require('rework-breakpoints');

// @myth, support calc(). Particularly useful with the rework-vars
var calc                          = require('rework-calc');
// @myth, mplements Tab Atkins's proposed color function in CSS.
var color                         = require('rework-color-function');
// @myth, Convert hex colors with alpha values into their RGBA equivalents for more browser support.
var hex                           = require('rework-hex-alpha');
// Implements the font-variant-* properties for browsers that don't yet support them.
var variants                      = require('rework-font-variant');
// Inherit mixin for rework. Allows you to inherit all the rules associated with a given selector
var inherit                       = require('rework-inherit');
// bclinkenbeard, extracted from rework core
var ease                          = require('rework-plugin-ease');
// bclinkenbeard, extracted from rework core
var at2x                          = require('rework-plugin-at2x');
// Suit, TODO
var conformance                   = require('rework-suit-conformance');

// 12th of June
// var rebeccapurple = require('rework-rebeccapurple');

// SITE CONFIG
// var cfg                           = require('../config/gulp');

///////////////////// SASS REQUIREMENTS ////////////////

var sass                          = require('gulp-sass');
var concat                        = require('gulp-concat');


module.exports = function(cfg) {

  var wwwDir      = cfg.uri[cfg.siteBuild].ghpages;
  var styleEntry  = cfg.uri[cfg.siteBuild].styleEntry;

  gulp.task('styles', function() {

    if (cfg.css === 'rework') {

      return gulp.src(styleEntry)
        .pipe(rework(
        npm(),
        vars(),
        dedupe(),
        breakpoints,
        calc,
        variants,
        hex,
        color,
        inherit(),
        conformance))

        // prefix, optimize, rename
        .pipe(autoprefixer(cfg.AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(gif(cfg.env === 'production', csso(true)))
        // .pipe(rename({suffix: '.min'}))
        // dest
        .pipe(gif(cfg.env === 'production', gulp.dest(wwwDir + '/www/assets/css')));

    } else if (cfg.css === 'sass') {

      return gulp.src(styleEntry)
        .pipe(sass({
          // Normally, gulp-sass exits on error. This is good during normal builds.
          // During watch builds, we only want to log the error.
          errLogToConsole: cfg.watch
        }))
        .pipe(concat('main.css'))
        .pipe(autoprefixer(cfg.AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(gif(cfg.env === 'production', csso(true)))
        // .pipe(rename({ extname: '.min.css' }))  // what is the point of this really?
        .pipe(size({title: 'styles:css'}))
        .pipe(gulp.dest(wwwDir + '/www/assets/css'));

    }

  });

}
