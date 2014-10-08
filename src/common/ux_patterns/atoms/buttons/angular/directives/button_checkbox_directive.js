'use strict';

module.exports = /*@ngInject*/
  function buttonCheckbox () {
    return {
      require: ['btnCheckbox', 'ngModel'],
      controller: 'ButtonsController',
      link: function (scope, element, attrs, ctrls) {
        var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        function getTrueValue() {
          return getCheckboxValue(attrs.btnCheckboxTrue, true);
        }

        function getFalseValue() {
          return getCheckboxValue(attrs.btnCheckboxFalse, false);
        }

        function getCheckboxValue(attributeValue, defaultValue) {
          var val = scope.$eval(attributeValue);
          return angular.isDefined(val) ? val : defaultValue;
        }

        //model -> UI
        ngModelCtrl.$render = function () {
          element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
        };

        //ui->model
        element.bind(buttonsCtrl.toggleEvent, function () {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
            ngModelCtrl.$render();
          });
        });
      }
    };
  };
