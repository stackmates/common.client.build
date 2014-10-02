
var _o;

module.exports = /*@ngInject*/
  function menuToggle (SlideMenuService) {
    'use strict';

    _o = {
      SlideMenuService: SlideMenuService
    };

    return {
      restrict: 'AE',
      link: postLink
    }
  };

function postLink (scope, iElement, iAttrs) {

  iElement.bind('click', function (evt) {
    _o.SlideMenuService.toggle(iAttrs.slideMenuReturn);
  })

};


