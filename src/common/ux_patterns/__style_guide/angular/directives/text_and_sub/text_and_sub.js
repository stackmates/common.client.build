'use strict';

module.exports = angular.module('app.evolving.components.textandsub', [
])

.directive('textAndSub',
  /*@ngInject*/
  function textAndSub (){
    'use strict';
    return {
      restrict: 'E',
      template: require('./text_and_sub.html.js'),
      scope: {
        text: '@',
        sub: '@'
      },
      link: function () {

      }
    };
  }
)
