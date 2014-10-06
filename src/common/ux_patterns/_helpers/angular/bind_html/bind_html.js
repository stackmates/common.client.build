'use strict';

module.exports = angular.module('sm.micro.bindHtml', [])


.directive('bindHtmlUnsafe', bindHtmlUnsafe );


function bindHtmlUnsafe () {
  return function (scope, element, attr) {
    element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
    scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
      element.html(value || '');
    });
  };
}
