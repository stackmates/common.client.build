'use strict';

var _o;

module.exports = /*@ngInject*/
  function slideMenuLeft ($rootScope, SlideMenuService) {
    'use strict';

    _o = {
      $rootScope: $rootScope,
      SlideMenuService: SlideMenuService
    };

    return {
      restrict: 'AE'
      // link: link
    }
  }

function link (scope, element, attrs) {
  // element.addClass('SlideMenu SlideMenu--horizontal SlideMenu--left');
  _o.$rootScope.$on('slideMenuEvent', function () {
    if ( _o.SlideMenuService.states.slideLeft.active ) {
      element.addClass('is-openToLeft');
    } else {
      element.removeClass('is-openToLeft');
    }
  })
}
