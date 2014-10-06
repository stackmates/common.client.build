'use strict';


module.exports = angular.module('sm.molecules.angular.dropdown', [])

.constant('dropdownConfig', {
  openClass: 'open'
})

.service('dropdownService', require('./services/dropdown_service'))

.controller('DropdownController', require('./controllers/dropdown_controller'))

.directive('dropdown', require('./directives/dropdown_directive'))
.directive('dropdownToggle', require('./directives/dropdown_toggle_directive'))

;
