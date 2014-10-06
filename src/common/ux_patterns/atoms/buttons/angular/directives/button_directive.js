'use strict';

module.exports = /*@ngInject*/
  function button (){
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
  };
