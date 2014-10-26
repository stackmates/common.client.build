'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function tooltipHtmlUnsafePopup () {
    return {
      restrict: 'EA',
      replace: true,   // solved problem on inlining with utf8
      scope: {
        content: '@',
        placement: '@',
        animation: '&',
        isOpen: '&'
      },
      template: fs.readFileSync(__dirname + '/templates/tooltip-html-unsafe-popup.html', 'utf8')
    };
  }
