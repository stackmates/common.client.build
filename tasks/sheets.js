'use strict';


var _              = require('lodash');
var googleDocsCms  = require('google-docs-cms');
var path           = require('path');

var gulp           = require('gulp');

// this output is read in by metalsmith so it can be used in a static site.
// TODO Copy this direct to data json and ignore json output

// TODO remove hardcoded id and send in arrays for processing different sheets
// look into creating linked google sheets to easily enable
// taking content out of private sheet / more complex sheets
// where information should not be shared

// 1i0d9IogJ1fBAokYkeo4cvS0G36SLHOEt6XonnRbW8BY

module.exports = function(cfg) {

  gulp.task('sheets', function(cb) {

    _.each(cfg.uri[cfg.siteBuild].sheets, function( sheet ){

      googleDocsCms({
        id: sheet,
        outPath: path.join('content', 'sheets.json' )
      }, function(err, res) {
        // console.log(res);
        // could do something more sophisticated here
        cb();
      });

    });



  });

}
