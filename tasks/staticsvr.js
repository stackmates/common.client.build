'use strict';


var gulp         = require('gulp');
var gutil        = require('gulp-util');

var connect      = require('connect');
var staticServer = require('serve-static'); // need this with connect 3.0

module.exports = function(cfg) {

  gulp.task('staticsvr', function(next) {
    var server = connect();
    server.use(staticServer('build'))
          .listen(cfg.port || 80, next);
  });

}

