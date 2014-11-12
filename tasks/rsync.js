'use strict';

var gulp  = require('gulp');
var rsync = require('gulp-rsync');
var sftp  = require("gulp-sftp");

var cfg   = require('../config/gulp');


gulp.task('rsync', function() {
  gulp.src('build/**')
    .pipe(rsync({
      root: 'build',
      hostname: 'docker-playground',
      destination: '/var/www',
      progress: true
    }));
});


gulp.task('sftp', function () {
    return gulp.src('build/**')
        .pipe(sftp({
            host: 'website.com',
            user: 'johndoe',
            pass: '1234'
        }));
});

