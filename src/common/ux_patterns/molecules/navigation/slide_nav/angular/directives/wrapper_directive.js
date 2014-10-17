

module.exports = /*@ngInject*/
  function SlideMenuWrapper ($rootScope, SlideMenuService) {
    'use strict';
    return {
        restrict: 'AEC'
      , link: function(scope, element, attrs) {
          // element.addClass('SlideMenu-wrapper SlideMenu--body-closed');

          $rootScope.$on('slideMenuEvent', function() {
            console.log('Body Caught Event: ' + SlideMenuService.canPush);
            switch(SlideMenuService.canPush) {
              case 'left':
                element.addClass('is-slideNavOpen is-transitioningSlideNav');
                break;
              default:
                element.removeClass('is-slideNavOpen is-transitioningSlideNav');
                break;
            }
          });
        }
    };
  }
