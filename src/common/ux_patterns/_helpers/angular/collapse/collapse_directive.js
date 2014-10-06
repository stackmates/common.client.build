'use strict';

module.exports = angular.module('common.directives.collapse',[
  require('ux_patterns/_helpers/angular/transition').name
])

// Simpilfied for now to get working.
// But would prefer to use animations with animate.css

// The collapsible directive indicates a block of html that will expand and collapse
.directive('collapse', Collapse );


function Collapse () {
  // CSS transitions don't work with height: auto, so we have to manually change the height to a
  // specific value and then once the animation completes, we can reset the height to auto.
  // Unfortunately if you do this while the CSS transitions are specified (i.e. in the CSS class
  // "collapse") then you trigger a change to height 0 in between.
  // The fix is to remove the "collapse" CSS class while changing the height back to auto - phew!

  // TODO investigate if needed
  //var fixUpHeight = function(scope, element, height) {
    // We remove the collapse CSS class to prevent a transition when we change to height: auto
    //element.removeClass('collapse');
    //element.css({ height: height });
    // It appears that  reading offsetWidth makes the browser realise that we have changed the
    // height already :-/
    //var x = element[0].offsetWidth;
    //element.addClass('collapse');
  //};

  return {
    link: function(scope, element, attrs) {

      var isCollapsed;

      element.addClass('collapse');

      scope.$watch(attrs.collapse, function(value) {
        if (value) {
          collapse();
        } else {
          expand();
        }
      });

      var expand = function() {
        element.addClass('in');
        isCollapsed = false;
      };

      var collapse = function() {
        isCollapsed = true;
        element.removeClass('in');
      };
    }
  };

}


