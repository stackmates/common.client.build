
'use strict';

module.exports = angular.module('common.directives.validate.ensure_has_date', [])

.directive('ensureHasDate',
  function() {
    return {
      require: '^ngModel',
      scope: {
        'ngModel': '=',
        'ensureHasDate': '='
      },
      link: function(scope, ele, attrs, c) {
        scope.$watch(attrs.ngModel, function(newVal) {
          console.log('newVal', newVal);
          console.log('newVal', scope.ensureHasDate);
          c.$setValidity('hasDate', true);
        });
      }
    };
  }
)

;
