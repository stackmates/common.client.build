'use strict';


// Use accordian-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="...."></accordion-heading>
// </accordion-group>

var _o;

module.exports = /*@ngInject*/
  function accordionHeading () {
    return {
      restrict: 'EA',
      transclude: true, // Grab the contents to be used as the heading
      template: '',     // In effect remove this element!
      replace: true,
      require: '^accordionGroup',
      link: function(scope, element, attr, accordionGroupCtrl, transclude) {
        // Pass the heading to the accordion-group controller
        // so that it can be transcluded into the right place in the template
        // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
        accordionGroupCtrl.setHeading(transclude(scope, function() {}));
      }
    };
  }
