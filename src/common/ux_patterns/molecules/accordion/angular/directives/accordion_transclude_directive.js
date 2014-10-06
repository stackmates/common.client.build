'use strict';

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>

var _o;

module.exports = /*@ngInject*/
  function accordionTransclude () {
    return {
      require: '^accordionGroup',
      link: function (scope, element, attr, controller ) {
        scope.$watch(function() { return controller[attr.accordionTransclude];}, function (heading) {
          if (heading) {
            element.html('');
            element.append(heading);
          }
        });
      }
    };
  }
