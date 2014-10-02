
/**
 * This file/module contains all configuration for the build process.
 */


var config = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  // siteBuild                  : '',
  env                        : 'development',
  port                       : 9090,

  AUTOPREFIXER_BROWSERS      :  [
                                  'ie >= 10',
                                  'ie_mob >= 10',
                                  'ff >= 30',
                                  'chrome >= 34',
                                  'safari >= 7',
                                  'opera >= 23',
                                  'ios >= 7',
                                  'android >= 4.4',
                                  'bb >= 10'
                                ],

  common: {
    buildHtml                :  'build/**/*.html',
    indexHtml                :  'www/index.html',
    markdown                 :  'content/**/*.md',
    buildHelpers             :  'templates/**/*.js',
    buildTemplates           :  'templates/**/*.hbs'
  },

  uri: {}

};


// sites
config.uri.[your-domain]SiteHome = require('../src/domain/[your-domain]/siteHome/config/gulp');
config.uri.[your-domain]AppLob   = require('../src/domain/[your-domain]/appLob/config/gulp');
config.uri.[your-domain]AppIonic = require('../src/domain/[your-domain]/appIonic/config/gulp');

module.exports = config;
