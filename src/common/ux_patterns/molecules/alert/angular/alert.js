'use strict';

var fs = require('fs');

module.exports = angular.module('sm.molecules.alert', [])

.controller('AlertController', ['$scope', '$attrs', function ($scope, $attrs) {
  $scope.closeable = 'close' in $attrs;
}])

.directive('alert', function () {
  return {
    restrict:'EA',
    controller:'AlertController',
    template: fs.readFileSync(__dirname + '/templates/alert.html', 'utf8'),
    transclude:true,
    replace:true,
    scope: {
      type: '@',
      close: '&'
    }
  };
})

;
