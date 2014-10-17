module.exports = {
  ghpages                 : 'ghpages/stackmates/appLob',
  baseURL                 : 'app.stackmat.es',
  contentDir              : '/Users/wik/googledrive/dreams/private/stackmates/external/',
  browserifyEntry         : './src/domain/stackmates/appLob/js/index.js',
  browserifySpecs         : './src/domain/stackmates/appLob/**/*.spec.js',
  styleEntry              : './src/domain/stackmates/appLob/style/main.css',
  watchJS                 : './src/domain/stackmates/appLob/js/**/*.js',
  indexHtml               : 'src/domain/stackmates/appLob/index.html',
  jsonData                : './src/domain/stackmates/_shared/data/**/*.json',
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
  templatesJsOut          : './src/common/tests/templates',
  karmaTestHelpers        : './src/domain/stackmates/appLob/test/helpers/**/*.js',
  images                  : [
                              './src/domain/stackmates/_shared/images/**/*'
                            ],
  fonts                   : [ 'src/common/fonts/**/*' ],
  icons                   : [
                              'src/domain/stackmates/_shared/icons/**/*'
                            ],
  data                    : [
                              'src/domain/stackmates/_shared/data/metalsmith_out/**/*'
                            ],
  meta                    :  './src/domain/stackmates/_shared/meta',
  watchStyles             : [
                              './src/common/style/rework/**/*.css',
                              './src/common/ux_patterns/**/*.css',
                              './src/domain/stackmates/**/*.css'
                            ],
  handlebarsHelpers       :   '../src/domain/stackmates/_shared/templates/helpers'
}
