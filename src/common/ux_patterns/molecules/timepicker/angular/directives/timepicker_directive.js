'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function timepicker () {
    return {
      restrict: 'EA',
      require: ['timepicker', '?^ngModel'],
      controller:'TimepickerController',
      replace: true,
      scope: {},
      // templateUrl: 'timepicker.html',
      template: fs.readFileSync(__dirname + '/templates/timepicker.html', 'utf8'),
      link: function(scope, element, attrs, ctrls) {
        var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        if ( ngModelCtrl ) {
          timepickerCtrl.init( ngModelCtrl, element.find('input') );
        }
      }
    };
  }
