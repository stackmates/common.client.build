'use strict';


// gulp and general utils
var gulp          = require('gulp');
var gif           = require('gulp-if');
var concat        = require('gulp-concat');

var templateCache = require('gulp-angular-templatecache');
var header = require('gulp-header');

// templates
var ngHtml2js     = require('gulp-ng-html2js');
var minifyHtml    = require("gulp-minify-html");

module.exports = function(cfg) {

  var wwwDir           = cfg.uri[cfg.siteBuild].ghpages;
  var templatesHtmlIn  = cfg.uri[cfg.siteBuild].templatesHtmlIn;
  var templatesJsOut   = cfg.uri[cfg.siteBuild].templatesJsOut;

  gulp.task('templates', function () {
    return gulp.src(templatesHtmlIn)
      .pipe(templateCache({
        standalone: true,
        module: 'app.templates'
      }))
      .pipe(header('module.exports = '))
      .pipe(gulp.dest(templatesJsOut));
  });

}
