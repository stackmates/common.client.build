'use strict';


module.exports = angular.module('sm.molecules.datepicker', [
  require('ux_patterns/_helpers/angular/date_parser').name,
  require('ux_patterns/_helpers/angular/position').name,
])


.constant('datepickerConfig', {
  formatDay: 'dd',
  formatMonth: 'MMMM',
  formatYear: 'yyyy',
  formatDayHeader: 'EEE',
  formatDayTitle: 'MMMM yyyy',
  formatMonthTitle: 'yyyy',
  datepickerMode: 'day',
  minMode: 'day',
  maxMode: 'year',
  showWeeks: true,
  startingDay: 0,
  yearRange: 20,
  minDate: null,
  maxDate: null
})


.constant('datepickerPopupConfig', {
  datepickerPopup: 'yyyy-MM-dd',
  currentText: 'Today',
  clearText: 'Clear',
  closeText: 'Done',
  closeOnDateSelection: true,
  appendToBody: false,
  showButtonBar: true
})


.controller('DatepickerController', require('./controllers/datepicker_controller'))


.directive('datepicker', require('./directives/datepicker_directive'))
.directive('daypicker', require('./directives/daypicker_directive'))
.directive('monthpicker', require('./directives/monthpicker_directive'))
.directive('yearpicker', require('./directives/yearpicker_directive'))
.directive('datepickerPopup', require('./directives/datepicker_popup_directive'))
.directive('datepickerPopupWrap', require('./directives/datepicker_popup_wrap_directive'))


;
