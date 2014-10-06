'use strict';


module.exports = /*@ngInject*/
  function datePicker () {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/datepicker/datepicker.html',
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
