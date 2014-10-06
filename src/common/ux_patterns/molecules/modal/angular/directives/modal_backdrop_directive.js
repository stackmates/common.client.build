'use strict';


module.exports = /*@ngInject*/
  function modalBackdrop ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'backdrop.html',
      link: function (scope, element, attrs) {
        scope.backdropClass = attrs.backdropClass || '';

        scope.animate = false;

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });
      }
    };
  };
