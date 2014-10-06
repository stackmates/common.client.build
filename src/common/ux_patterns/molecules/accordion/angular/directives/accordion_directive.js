'use strict';

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself

module.exports = /*@ngInject*/
  function accordion () {
    return {
      restrict: 'EA',
      controller: 'AccordionController',
      transclude: true,
      replace: false,
      templateUrl: 'accordion.html'
    }
  }
