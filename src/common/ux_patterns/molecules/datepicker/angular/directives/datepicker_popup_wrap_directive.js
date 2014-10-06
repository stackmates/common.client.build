'use strict';


module.exports = /*@ngInject*/
  function datepickerPopupWrap () {
    return {
      restrict:'EA',
      replace: true,
      transclude: true,
      templateUrl: 'popup.html',
      link:function (scope, element, attrs) {
        element.bind('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
        });
      }
    };
  };
