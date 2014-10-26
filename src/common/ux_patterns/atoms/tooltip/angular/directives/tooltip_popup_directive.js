'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function tooltipPopup () {
    return {
      restrict: 'EA',
      replace: true,   // true does not work with true if inlining
      scope: {
        content: '@',
        placement: '@',
        animation: '&',
        isOpen: '&'
      },
      template: fs.readFileSync(__dirname + '/templates/tooltip-popup.html', 'utf8')
    };
  }
