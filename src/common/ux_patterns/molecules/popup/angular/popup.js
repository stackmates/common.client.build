'use strict';

var fs = require('fs');
/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html popovers, and selector delegatation.
 */
module.exports = angular.module( 'sm.molecules.angular.popover', [
  require('ux_patterns/atoms/tooltip/angular').name
])


.directive( 'popoverPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      title: '@',
      content: '@',
      placement: '@',
      animation: '&',
      isOpen: '&'
    },
    template: fs.readFileSync(__dirname + '/templates/popup.html', 'utf8')
  };
})


.directive( 'popover', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'popover', 'popover', 'click' );
}])

;
