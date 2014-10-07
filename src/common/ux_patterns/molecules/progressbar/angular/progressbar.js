'use strict';

module.exports = angular.module('sm.molecules.progressbar', [])

.constant('progressConfig', {
  animate: true,
  max: 100
})

.controller('ProgressController', require('./controllers/progress_controller'))

.directive('progress',    require('./directives/progress_directive'))
.directive('bar',         require('./directives/bar_directive'))
.directive('progressbar', require('./directives/progressbar_directive'))

;
