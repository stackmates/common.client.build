'use strict';

module.exports = /*@ngInject*/
  function PlaceMatController( $scope ) {

    $scope.fork  = $scope.getSilverWare(0);
    $scope.spoon = $scope.getSilverWare(1);
    $scope.knife = $scope.getSilverWare(2);

  };
