'use strict';

module.exports = angular.module('app.evolving.controller.placemat', [
  require('./table').name
])

.controller( 'PlacematController',
  /*@ngInject*/
  function PlacematController( $scope ) {

    $scope.fork  = $scope.getSilverWare(0);
    $scope.spoon = $scope.getSilverWare(1);
    $scope.knife = $scope.getSilverWare(2);
  }

)
