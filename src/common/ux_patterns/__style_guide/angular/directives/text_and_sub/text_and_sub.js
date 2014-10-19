
module.exports = /*@ngInject*/
  function textAndSub (){
    'use strict';
    return {
      restrict: 'E',
      template: require('./text_and_sub.html.js'),
      // templateUrl: 'evolving_practices/templates/text-and-sub.html',
      scope: {
        text: '@',
        sub: '@'
      },
      // link: function (scope, element, attrs) { TODO
      link: function () {

      }
    };
  }
