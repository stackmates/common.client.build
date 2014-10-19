'use strict';

module.exports = angular.module('app.evolving.components.sizecheck', [
])

.directive('sizeCheck',
  /*@ngInject*/
  function sizeCheck (){
    'use strict';
    return {
      restrict: 'A',
      scope: false,
      require: 'ngModel',
      link: link
    };
  }
)

function link (scope, element, attrs, ngModelController) {
  ngModelController.$parsers.push(function(val) {
    if( !isNaN( parseInt(val, 10)) ) {
      if (parseInt(val,10) > parseInt(attrs.sizeCheck, 10)) {
        ngModelController.$setValidity('tooBig', false);
        return undefined;
      } else {
        ngModelController.$setValidity('tooBig', true);
        return val;
      }
    } else {
      return val;
    }
  });
}

