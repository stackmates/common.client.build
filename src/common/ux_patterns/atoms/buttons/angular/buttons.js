'use strict';

// “Use the compile function rather than the linking function because
// our changes to the element do not rely on the scope data that
// will be bound to the element. With a linking, if the button appears in
// an ng-repeat loop, then addClass() would be called for each iteration
// of the button.
// Using compile can provide a significant performance optimization”

module.exports = angular.module( 'sm.atoms.buttons', [])

.constant('buttonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
})


.controller('ButtonsController', ['buttonConfig', function(buttonConfig) {
  this.activeClass = buttonConfig.activeClass || 'active';
  this.toggleEvent = buttonConfig.toggleEvent || 'click';
}])


.directive('button',         require('./directives/button_directive'))
.directive('btnRadio',    require('./directives/button_radio_directive'))
.directive('btnCheckbox', require('./directives/button_checkbox_directive'))

;
