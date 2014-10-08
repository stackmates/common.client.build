'use strict';

module.exports = /*@ngInject*/
  function tooltipPopup () {
    return {
      restrict: 'EA',
      replace: true,
      scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
      templateUrl: 'tooltip-popup.html'
    };
  }
