// RUN with
// gulp karma -b smAppAng -t test


module.exports = {
  browserifySpecs         : './src/common/ux_patterns/molecules/**/angular/**/*.spec.js',
  watchJS                 : './src/common/ux_patterns/**/angular/**/*.js',
  templatesHtmlIn         : [
                              './src/domain/stackmates/appLob/js/**/*.html',
                              './src/domain/stackmates/_shared/angular/**/*.html',
                              './src/common/ux_patterns/atoms/tooltip/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/accordion/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/alert/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/carousel/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/datepicker/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/modal/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/navigation/pagination/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/navigation/tabs/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/popup/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/progressbar/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/rating/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/timepicker/angular/templates/**/*.html',
                              './src/common/ux_patterns/molecules/typeahead/angular/templates/**/*.html',
                              './src/common/ux_patterns/organisms/dynamic_list/angular/templates/**/*.html'
                            ],
  karmaTestFiles          : [
                              'node_modules/jquery/dist/jquery.js',
                              'node_modules/bower_components/angular/angular.js',
                              'node_modules/bower_components/angular-mocks/angular-mocks.js',
                              './test/helpers/**/*.js',
                              'test/build/bundle-tests.js'
                            ]
}
