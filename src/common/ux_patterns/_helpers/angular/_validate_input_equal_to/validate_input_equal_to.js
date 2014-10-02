'use strict';

angular.module( 'common.directives.validate.input_equal_to', [])

.directive('inputEqualTo',
  function(){
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        function inputEqualTo(myValue) {
          var valid = (myValue === scope.$eval(attrs.inputEqualTo));
          ngModelCtrl.$setValidity('equal', valid);
          return valid ? myValue : undefined;
        }
        ngModelCtrl.$parsers.push(inputEqualTo);
        ngModelCtrl.$formatters.push(inputEqualTo);

        scope.$watch(attrs.inputEqualTo, function() {
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        });
      }
    };
  }
)

;

/*
 *

  InputEqualTo(value), compares the passed in value with the value of the expression.
  We push this into the $parsers and $formatters pipelines, so that the validation function
  gets called each time either the model or the view changes.

  In this directive we also have to take into account the model we are comparing against changing. eg compareTo or testValue and
  We do this by setting up a watch on the expression, which we retrieve from the attrs parameter of
  the linking function.

  When it does change, we artificially trigger the $parsers pipeline to run by calling $setViewValue().
  This ensures that all potential $parsers are run in case any of them modify the model value before it gets to our validator.”


  Usage example

        <form name="passwordForm">

          <label>Password</label>
          <input type="password" name="password"
              ng-model="user.password" required>
          <span class="help-inline"
              ng-show="passwordForm['password'].$error['required']" >
                This field is required.
          </span>

          <label>Password (repeat)</label>

          <input type="password" name="passwordRepeat"
              ng-model="password" required input-equal-to="user.password">

          <span  class="help-inline"
                ng-show="passwordForm['passwordRepeat'].$error['required']">
                  This field is required.
          </span>
          <span  class="help-inline"
                ng-show="passwordForm['passwordRepeat'].$error['equal']">  =>   ngModelCtrl.$setValidity('equal', valid);
                Passwords do not match.
          </span>
        </form>

*/
