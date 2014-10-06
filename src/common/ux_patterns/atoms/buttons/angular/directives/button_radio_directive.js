'use strict';

module.exports = /*@ngInject*/
  function buttonRadio () {
    return {
      require: ['buttonRadio', 'ngModel'],
      controller: 'ButtonsController',
      link: function (scope, element, attrs, ctrls) {
        var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        //model -> UI
        ngModelCtrl.$render = function () {
          element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
        };

        //ui->model
        element.bind(buttonsCtrl.toggleEvent, function () {
          var isActive = element.hasClass(buttonsCtrl.activeClass);

          if (!isActive || angular.isDefined(attrs.uncheckable)) {
            scope.$apply(function () {
              ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.btnRadio));
              ngModelCtrl.$render();
            });
          }
        });
      }
    };
  };
