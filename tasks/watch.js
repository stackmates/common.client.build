

var gulp              = require('gulp');
var gif               = require('gulp-if');
var runSequence       = require('run-sequence');

var watch             = require('gulp-watch');

var livereload        = require('gulp-livereload');

var cfg               = require('../config/gulp');


module.exports = function(cfg) {

  gulp.task('watch', ['staticsvr'], function(cb) {

    if (cfg.type.trim() === 'site') {
      console.log('watching site');
      runSequence (['build','watchSite'], cb);
    } else {
      console.log('watching app');
      runSequence (['build', 'watchApp'], cb);
    }
  });

}


// gulp.task('watchApp', ['karma-watch'], function(){  /// TOO SLOW FIGURE OUT PROBLEM
gulp.task('watchApp', function(){



    var server = livereload();
    gulp.watch('build/**').on('change', function(file) {
        server.changed(file.path);
    });

    // Watch for new styles
    gulp.watch(
      cfg.uri[cfg.siteBuild].watchStyles,
      { maxListeners: 999999 },
      ['styles']
    );

    // Scripts are run by watchify into app.js which should trigger page reload and karma
    gulp.watch(
      cfg.uri[cfg.siteBuild].templatesHtmlIn,
      { maxListeners: 999999 },
      ['browserifyAngular']
    );

    // TOO SLOW REVERT TO MANUAL OR HAVE DESIGN MODE VS TEST MODE
    // writes to build/test/test-bundle which is watched by karma
    // gulp.watch([
    //     cfg.uri[cfg.siteBuild].templatesHtmlIn,
    //     cfg.uri[cfg.siteBuild].browserifySpecs
    //   ],
    //   { maxListeners: 999999 },
    //   ['browserifySpecs']
    // );

    // Watch images
    gulp.watch(cfg.uri[cfg.siteBuild].images, { maxListeners: 999999 }, ['images']);

    // ACTUALLY NO NEED FOR THIS AS NEED TO RESTART TO LOAD EDIT
    // gulp.watch([
    //     cfg.uri[cfg.siteBuild].fonts,
    //     cfg.uri[cfg.siteBuild].meta,
    //     cfg.uri[cfg.siteBuild].icons
    //   ],
    //   { maxListeners: 999999 },
    //   ['assets']);

    gulp.watch(cfg.uri[cfg.siteBuild].indexHtml, ['indexHtml']);

    // Watch for new content on google drive
    gulp.watch(
      cfg.uri[cfg.siteBuild].contentDir + '/**/*',
      { maxListeners: 999999 },
      ['fetchContent', 'sheets']
    );

})


gulp.task('watchSite', function(){


    console.log('watching site changes');

    var server = livereload();
    gulp.watch('build/**').on('change', function(file) {
        server.changed(file.path);
    });

    // Watch for new styles
    gulp.watch(
      cfg.uri[cfg.siteBuild].watchStyles,
      { maxListeners: 999999 },
      ['styles']);

    // Watch for script changes
    // ? Why am I doing this here, this should be run by watchify?
    gulp.watch(
      cfg.uri[cfg.siteBuild].watchScripts,
      { maxListeners: 999999 },
      ['scripts']);

    // Watch images
    gulp.watch(
      cfg.uri[cfg.siteBuild].images,
      { maxListeners: 999999 },
      ['images']);

    // Watch others assets, pretty fast so grouped
    gulp.watch([
        cfg.uri[cfg.siteBuild].fonts,
        cfg.uri[cfg.siteBuild].meta,
        cfg.uri[cfg.siteBuild].icons
      ],
      { maxListeners: 999999 },
      ['assets']);


    // Watch for new content
    gulp.watch(
      cfg.uri[cfg.siteBuild].contentDir + '/**/*',
      { maxListeners: 999999 },
      ['fetchContent', 'sheets']
    );


    // Watch for new partials
    gulp.watch(
      cfg.uri[cfg.siteBuild].fetchSitePartials + '/**/*',
      { maxListeners: 999999 },
      ['fetchPartialTemplates']
    );

    // Watch for new views
    gulp.watch(
      cfg.uri[cfg.siteBuild].fetchSiteViewPoints + '/**/*',
      { maxListeners: 999999 },
      ['fetchSiteViewPoints']
    );

    // Watch for new content
    gulp.watch([
        cfg.common.markdown,
        // cfg.common.buildHelpers,
        // cfg.common.buildTemplates,
        cfg.uri[cfg.siteBuild].templates + '**/*',
      ],
      ['metalsmith']
    );

});


