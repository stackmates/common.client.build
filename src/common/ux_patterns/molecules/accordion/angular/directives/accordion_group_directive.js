'use strict';

// The accordion-group directive indicates a block of html that will
// expand and collapse in an accordion
var fs = require('fs');

var _o;

module.exports = /*@ngInject*/
  function accordionGroup () {
    return {
      require:'^accordion',         // We need this directive to be inside an accordion
      restrict:'EA',
      transclude:true,              // It transcludes the contents of the directive into the template
      replace: true,               // template needs to be utf8 to be true
      template: fs.readFileSync(__dirname + '/templates/accordion-group.html', 'utf8'),
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
