//
var gulp              = require('gulp');
var gif               = require('gulp-if');

var runSequence       = require('run-sequence');

var argv = require('minimist')(process.argv.slice(2));
var cfg = require('./config/gulp');

cfg.watch = ((process.argv[2].trim() ==='watch') ? true : false );
cfg.siteBuild = ( argv.b ? argv.b : 'siteHome');
cfg.env = ( argv.e ? argv.e.trim() : 'development');
cfg.css = ( argv.c ? argv.c.trim() : 'rework');
cfg.type = ( argv.t ? argv.t.trim() : 'site');


require('./tasks/clean')(cfg);               // wipe stuff out

require('./tasks/fetch_content')(cfg);       // fetch in anything you need
require('./tasks/sheets')(cfg);              // build json from google spreadsheets

require('./tasks/styles')(cfg);              // rework style build
require('./tasks/styles_sass')(cfg);         // sass style build

if (cfg.type === 'site') {
  require('./tasks/metalsmith');             // static content builder
}

if (cfg.type === 'app') {
  require('./tasks/templates')(cfg);           // html to js for angular
}


require('./tasks/browserify');               // browserify angularjs.app (needed?)
require('./tasks/karma')(cfg);               // test javascript

require('./tasks/images')(cfg);              // fetch and process imagees
require('./tasks/assets')(cfg);              // fetch and process icons, fonts etc
require('./tasks/cordova')(cfg);             // cordova stuff

// do some renaming, minification for websites
require('./tasks/html')(cfg);

require('./tasks/pagespeed')(cfg);           // performance testing

require('./tasks/staticsvr')(cfg);           // test server
// require('./tasks/git');
require('./tasks/watch')(cfg);


//  NOTE there is some weird bug with run sequence when occasionally it fails to run
gulp.task('build', ['clean'], function(cb) {

    if (cfg.type.trim() === 'app') {

      console.log('running app build');

      runSequence (
        [
          'sheets',
          'styles',
          'images',
          'assets',
          'scriptsAngular',
          'cordova',
          'indexHtml',
        ],
        // ['karma'],
        cb
      );

    } else {

      runSequence (
        ['fetchContent', 'sheets'],
        ['metalsmith'],
        ['scripts','styles','images','assets','html'],
        cb
      );

    }

});


gulp.task('default', ['build'], function() {});

