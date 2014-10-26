'use strict';

var fs = require('fs');
// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself

module.exports = /*@ngInject*/
  function accordion () {
    return {
      restrict: 'EA',
      controller: 'smAccordionController',
      transclude: true,
      replace: true,
      template: fs.readFileSync(__dirname + '/templates/accordion.html', 'utf8')
      // templateUrl: 'accordion.html'
    }
  }
