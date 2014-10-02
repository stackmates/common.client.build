'use strict';

// “Use the compile function rather than the linking function because
// our changes to the element do not rely on the scope data that
// will be bound to the element. With a linking, if the button appears in
// an ng-repeat loop, then addClass() would be called for each iteration
// of the button.
// Using compile can provide a significant performance optimization”

module.exports = angular.module( 'common.directives.buttons', [])

.directive('button',
  function(){
    return {
      restrict: 'E',
      compile: function(element, attrs) {
        element.addClass('Button');
        if( attrs.type === 'submit' ) {
          element.addClass('Button--primary');
        }
        if(attrs.size) {
          element.addClass('Button--' + attrs.size );
        }
      }
    };
  }
)

;

