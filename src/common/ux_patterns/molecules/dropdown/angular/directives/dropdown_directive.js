'use strict';


module.exports = /*@ngInject*/
  function dropdown () {
    return {
      controller: 'smDropdownController',
      link: function(scope, element, attrs, dropdownCtrl) {
        dropdownCtrl.init( element );
      }
    };
  };
