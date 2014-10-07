'use strict';

// See Rename minErr and make it accessible from outside https://github.com/angular/angular.js/issues/6913

module.exports = /*@ngInject*/
  function() {
    var minErr = angular.$$minErr('ui.select');
    return function() {
      var error = minErr.apply(this, arguments);
      var message = error.message.replace(new RegExp('\nhttp://errors.angularjs.org/.*'), '');
      return new Error(message);
    };
  };
