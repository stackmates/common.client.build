'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function datepickerPopupWrap () {
    return {
      restrict:'EA',
      replace: true,
      transclude: true,
      // templateUrl: 'popup.html',
      template: fs.readFileSync(__dirname + '/templates/popup.html', 'utf8'),
      link:function (scope, element, attrs) {
        element.bind('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
        });
      }
    };
  };
