'use strict';

// Recreates old behavior of ng-transclude. Used internally.
module.exports = /*@ngInject*/
  function transcludeAppend () {
    return {
      link: function (scope, element, attrs, ctrl, transclude) {
        transclude(scope, function (clone) {
          element.append(clone);
        });
      }
    };
  }
