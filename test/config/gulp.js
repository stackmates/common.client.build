// RUN with
// gulp karma -b smAppAng -t test


module.exports = {
  browserifySpecs : './src/common/ux_patterns/molecules/typeahead/angular/**/*.spec.js',
  // browserifySpecs : './src/common/ux_patterns/__style_guide/angular/**/*.spec.js',
  // browserifySpecs : './src/common/ux_patterns/__style_guide/angular/**/*.spec.js',
  // browserifySpecs : './src/common/ux_patterns/__style_guide/angular/services/**/*.spec.js',
  // browserifySpecs : './src/common/ux_patterns/__style_guide/angular/controllers/**/*.spec.js',
  // browserifySpecs : './src/common/ux_patterns/__style_guide/angular/directives/**/*.spec.js',
  karmaTestFiles  : [
                      'node_modules/jquery/dist/jquery.js',
                      'node_modules/bower_components/angular/angular.js',
                      'node_modules/bower_components/angular-mocks/angular-mocks.js',
                      './test/helpers/**/*.js',
                      'test/build/bundle-tests.js'
                    ]
}
