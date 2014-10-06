'use strict';

module.exports = /*@ngInject*/
  function progressBar () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      controller: 'ProgressController',
      scope: {
          value: '=',
          type: '@'
      },
      templateUrl: 'template/progressbar/progressbar.html',
      link: function(scope, element, attrs, progressCtrl) {
          progressCtrl.addBar(scope, angular.element(element.children()[0]));
      }
    };
  }
