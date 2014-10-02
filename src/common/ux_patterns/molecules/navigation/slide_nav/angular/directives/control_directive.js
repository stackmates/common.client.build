

module.exports = /*@ngInject*/
  function SlideControlDirective (SlideMenuService) {
    return {
        restrict: 'AEC'
      , compile: function(element, attrs) {
          element[0].innerHTML = '<a href="#">' + element[0].innerHTML + '</a>';
          return {
              pre: function preLink(scope, iElement, iAttrs) {
              }
            , post: function postLink(scope, iElement, iAttrs) {
                iElement.find('a').on('click', function(ev) {
                  console.log('toggle attrs', iAttrs.slideMenuControl);
                  ev.preventDefault();
                  SlideMenuService.toggle(iAttrs.slideMenuControl);
                });
              }
          };
        }
    };
  };
