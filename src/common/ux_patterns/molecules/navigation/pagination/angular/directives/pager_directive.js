'use strict';


module.exports = /*@ngInject*/
  function pager (pagerConfig) {
    return {
      restrict: 'EA',
      scope: {
        totalItems: '=',
        previousText: '@',
        nextText: '@'
      },
      require: ['pager', '?ngModel'],
      controller: 'PaginationController',
      templateUrl: 'pager.html',
      replace: true,
      link: function(scope, element, attrs, ctrls) {
        var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        if (!ngModelCtrl) {
           return; // do nothing if no ng-model
        }

        scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
        paginationCtrl.init(ngModelCtrl, pagerConfig);
      }
    };
  }
