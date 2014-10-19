

module.exports = /*@ngInject*/
  function stateful (DessertLog){
    'use strict';
    return {
      restrict: 'A',
      // switch between true and false to check consequence on test
      scope: true,
      link: function (scope, element, attrs) {
        if (!attrs.stateful) {
          throw 'You must provide a class name in order to use the stateful directive';
        }

        element.bind('click', function(){
          scope.$apply(function(){
            if (!element.hasClass(attrs.stateful)) {
              element.addClass(attrs.stateful);
            } else {
              element.removeClass(attrs.stateful);
            }
          });
        });

        scope.logNodeBehaviour = function (message) {
          DessertLog.messages.push(message);
        };
      }
    };
  }
