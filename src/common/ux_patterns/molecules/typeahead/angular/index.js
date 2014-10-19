'use strict';

// angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])

module.exports = angular.module('sm.molecules.typeahead', [
 require('ux_patterns/_helpers/angular/bind_html').name,
 require('ux_patterns/_helpers/angular/position').name
])

.factory('typeaheadParser',   require('./services/typeahead_parser'))

.directive('typeahead',       require('./directives/typeahead'))
.directive('typeaheadMatch',  require('./directives/typeahead_match'))
.directive('typeaheadPopup',  require('./directives/typeahead_popup'))

.filter('typeaheadHighlight', require('./filters/typeahead_highlight'))

;
