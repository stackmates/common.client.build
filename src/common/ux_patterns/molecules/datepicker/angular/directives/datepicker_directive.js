'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function datePicker () {
    return {
      restrict: 'EA',
      replace: true,
      // templateUrl: 'datepicker.html',
      template: fs.readFileSync(__dirname + '/templates/datepicker.html', 'utf8'),
      scope: {
        datepickerMode: '=?',
        dateDisabled: '&'
      },
      require: ['datepicker', '?^ngModel'],
      controller: 'DatepickerController',
      link: function(scope, element, attrs, ctrls) {
        var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        if ( ngModelCtrl ) {
          datepickerCtrl.init( ngModelCtrl );
        }
      }
    };
  };
