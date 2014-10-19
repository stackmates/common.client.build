

var cfg = require('../config/gulp');
var testFiles        = cfg.uri[cfg.siteBuild].karmaTestFiles;
var templates        = cfg.uri[cfg.siteBuild].templatesHtmlIn;


module.exports = {
  basePath: __dirname + '/..',
  frameworks: ['jasmine', 'browserify'],
  reporters: ['progress'],
  browsers: ['Chrome'],

  files: [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bower_components/angular/angular.js',
    'node_modules/bower_components/angular-mocks/angular-mocks.js',
    './test/helpers/**/*.js',
    'test/build/bundle-tests.js'
  ],
  autoWatch: false,
  singleRun: false,
  colors: true,
  captureTimeout: 60000,
  coverageReporter: {
    type: 'html',
    dir: 'test/coverage/'
  },
  browserify: {
    watch: true
  }
};



