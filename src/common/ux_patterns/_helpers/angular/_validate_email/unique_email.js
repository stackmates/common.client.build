'use strict';

module.exports = angular.module( 'common.directives.validate.unique_email', [])
/**
 * A validation directive to ensure that the model contains a unique
 * @param Users service to provide access to the server's user database
 */
.directive('uniqueEmail',
  function(Users){
    return {
      require:'ngModel',
      restrict:'A',
      link:function (scope, element, attrs, ngModelCtrl) {
        var original;

        // If the model changes, store this since
        // we assume it is the current value of the user's email
        // and we don't want to check the server if the user
        // re-enters their original email
        ngModelCtrl.$formatters.unshift(function(modelValue) {
          //console.log(modelValue);
          original = modelValue;
          return modelValue;
        });

        // using push() run the last parser, after we are sure that
        // other validators were run
        ngModelCtrl.$parsers.push(function(viewValue){
          if(viewValue && viewValue !== original ) {
            Users.query({email:viewValue}, function (users) {
              if (users.length === 0) {
                ngModelCtrl.$setValidity('uniqueEmail', true);
              } else {
                ngModelCtrl.$setValidity('uniqueEmail', false);
              }
            });
            return viewValue;
          }
        });
      }
    };

  }
)


;

/* $parser checks with server when the user changes the input.
 * If the value is updated programmatically, via the model, assume business logic permits that
 *
 * Normally, in a validation function you return undefined if the value is not valid.
 * This prevents the model from being updated with an invalid value.
 * In this case, at the point of returning, the validation function does not know
 * so return the value then let the response callback set the validity later.
 */
