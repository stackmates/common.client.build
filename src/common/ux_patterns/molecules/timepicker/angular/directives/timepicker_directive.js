'use strict';

module.exports = /*@ngInject*/
  function timepicker () {
    return {
      restrict: 'EA',
      require: ['timepicker', '?^ngModel'],
      controller:'TimepickerController',
      replace: true,
      scope: {},
      templateUrl: 'template/timepicker/timepicker.html',
      link: function(scope, element, attrs, ctrls) {
        var timepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        if ( ngModelCtrl ) {
          timepickerCtrl.init( ngModelCtrl, element.find('input') );
        }
      }
    };
  }
