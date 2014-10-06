'use strict';

module.exports = /*@ngInject*/
  function tooltipHtmlUnsafePopup () {
    return {
      restrict: 'EA',
      replace: true,
      scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
      templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
    };
  }
