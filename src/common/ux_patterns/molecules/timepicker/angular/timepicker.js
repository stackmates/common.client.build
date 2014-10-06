'use strict';

module.exports = angular.module('sm.molecules.timepicker', [])

.constant('timepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  showMeridian: true,
  meridians: null,
  readonlyInput: false,
  mousewheel: true
})

.controller('TimepickerController', require('./controllers/timepicker_controller'))

.directive('timepicker', require('./directives/timepicker_directive'))

;
