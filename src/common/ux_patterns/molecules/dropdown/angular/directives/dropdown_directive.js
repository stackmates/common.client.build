'use strict';


module.exports = /*@ngInject*/
  function dropdownDirective () {
    return {
      restrict: 'CA',
      controller: 'DropdownController',
      link: function(scope, element, attrs, dropdownCtrl) {
        dropdownCtrl.init( element );
      }
    };
  }
