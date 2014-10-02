
module.exports = /*@ngInject*/
  function textAndSub (){
    'use strict';
    return {
      restrict: 'E',
      templateUrl: 'evolving_practices/templates/text-and-sub.html',
      scope: {
        text: '@',
        sub: '@'
      },
      // link: function (scope, element, attrs) { TODO
      link: function () {

      }
    };
  }
