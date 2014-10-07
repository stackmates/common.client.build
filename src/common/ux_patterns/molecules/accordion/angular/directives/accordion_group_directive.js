'use strict';

// The accordion-group directive indicates a block of html that will
// expand and collapse in an accordion

var _o;

module.exports = /*@ngInject*/
  function accordionGroup ($parse) {
    return {
      require: '^accordion',        // We need this directive to be inside an accordion
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl: 'accordion-group.html',
      scope:{
        heading:'@'
      },
      controller: function() {
        this.setHeading = function(element) {
          this.heading = element;
        };
      },
      link: function(scope, element, attrs, accordionCtrl) {
        var getIsOpen,
            setIsOpen;

        accordionCtrl.addGroup(scope);

        scope.isOpen = false;

        if ( attrs.isOpen ) {
          getIsOpen = $parse(attrs.isOpen);
          setIsOpen = getIsOpen.assign;

          scope.$parent.$watch(getIsOpen, function(value) {
            scope.isOpen = !!value;
          });
        }

        scope.$watch('isOpen', function(value) {
          if ( value ) {
            accordionCtrl.closeOthers(scope);
          }
          if ( setIsOpen ) {
            setIsOpen(scope.$parent, value);
          }
        });
      }
    };
  };
