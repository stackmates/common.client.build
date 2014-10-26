'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function modalBackdrop ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      template: fs.readFileSync(__dirname + '/templates/backdrop.html', 'utf8'),
      link: function (scope, element, attrs) {
        scope.backdropClass = attrs.backdropClass || '';

        scope.animate = false;

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });
      }
    };
  };
