'use strict';

// path config
// var cfg = require('../config/gulp');

var gulp          = require('gulp');
var del           = require('del');

module.exports = function(cfg){

  var wwwDir = cfg.uri[cfg.siteBuild].ghpages + '/www';

  gulp.task('clean',
    del.bind(null, [ wwwDir, 'build', 'content' ])
  );

  gulp.task('cleanTests',
    del.bind(null, [ 'test/build' ])
  );



};



