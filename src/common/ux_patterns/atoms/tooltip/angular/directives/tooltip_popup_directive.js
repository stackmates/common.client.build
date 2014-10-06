'use strict';

module.exports = /*@ngInject*/
  function tooltipPopup () {
    return {
      restrict: 'EA',
      replace: true,
      scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
      templateUrl: 'template/tooltip/tooltip-popup.html'
    };
  }
