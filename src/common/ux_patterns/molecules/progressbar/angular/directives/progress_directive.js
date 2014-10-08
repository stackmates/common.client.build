'use strict';

module.exports = /*@ngInject*/
  function progress () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      controller: 'ProgressController',
      require: 'progress',
      scope: {},
      templateUrl: 'progress.html'
    };
  }
