'use strict';


module.exports = /*@ngInject*/
  function dropdown () {
    return {
      controller: 'DropdownController',
      link: function(scope, element, attrs, dropdownCtrl) {
        dropdownCtrl.init( element );
      }
    };
  };
