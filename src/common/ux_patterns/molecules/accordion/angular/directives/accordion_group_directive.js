'use strict';

// The accordion-group directive indicates a block of html that will
// expand and collapse in an accordion

var _o;

module.exports = /*@ngInject*/
  function accordionGroup () {
    return {
      require:'^accordion',         // We need this directive to be inside an accordion
      restrict:'EA',
      transclude:true,              // It transcludes the contents of the directive into the template
      replace: true,                // The element containing the directive will be replaced with the template
      templateUrl:'accordion-group.html',
      scope: {
        heading: '@',               // Interpolate the heading attribute onto this scope
        isOpen: '=?',
        isDisabled: '=?'
      },
      controller: function() {
        this.setHeading = function(element) {
          this.heading = element;
        };
      },
      link: function(scope, element, attrs, accordionCtrl) {
        accordionCtrl.addGroup(scope);

        scope.$watch('isOpen', function(value) {
          if ( value ) {
            accordionCtrl.closeOthers(scope);
          }
        });

        scope.toggleOpen = function() {
          if ( !scope.isDisabled ) {
            scope.isOpen = !scope.isOpen;
          }
        };
      }
    };
  }
