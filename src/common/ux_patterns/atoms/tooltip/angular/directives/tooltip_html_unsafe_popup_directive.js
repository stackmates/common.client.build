'use strict';

module.exports = /*@ngInject*/
  function tooltipHtmlUnsafePopup () {
    return {
      restrict: 'EA',
      replace: true,
      scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
      templateUrl: 'tooltip-html-unsafe-popup.html'
    };
  }
