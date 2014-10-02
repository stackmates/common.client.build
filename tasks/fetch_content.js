'use strict';


var runSequence = require('run-sequence');

var gulp = require('gulp');
var cache = require('gulp-cached');
var imagemin = require('gulp-imagemin');
var gif = require('gulp-if');


// Get content from shared drive ( google drive / dropbox etc )

module.exports = function(cfg) {

var remoteMarkdownFiles = cfg.uri[cfg.siteBuild].contentDir + '**/*.md';

  gulp.task('fetchContent', function(callback) {
    runSequence(['mdContent'], callback);
  });


  gulp.task('mdContent', function() {
    return gulp.src(remoteMarkdownFiles)
      .pipe(gulp.dest('content'));
  });

}
