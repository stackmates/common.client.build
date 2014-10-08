'use strict';

module.exports = /*@ngInject*/
  function bar () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      require: '^progress',
      scope: {
          value: '=',
          type: '@'
      },
      templateUrl: 'bar.html',
      link: function(scope, element, attrs, progressCtrl) {
          progressCtrl.addBar(scope, element);
      }
    };
  }
