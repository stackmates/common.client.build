'use strict';

var fs = require('fs');

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
      template: fs.readFileSync(__dirname + '/templates/pager.html', 'utf8'),
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
