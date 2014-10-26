'use strict';


module.exports = angular.module('sm.molecules.modal', [
  require('ux_patterns/_helpers/angular/transition').name,
  require('./directives/templates/converted/window.html').name
])


.factory('$$stackedMap',      require('./services/modal_stack_map_service'))
.factory('$modalStack',       require('./services/modal_stack_service'))
.provider('$modal',           require('./services/modal_provider'))

.directive('modalBackdrop',   require('./directives/modal_backdrop_directive'))
.directive('modalWindow',     require('./directives/modal_window_directive'))
.directive('modalTransclude', require('./directives/modal_transclude_directive'))

;

