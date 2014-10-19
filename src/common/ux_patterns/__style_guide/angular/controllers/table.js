'use strict';

module.exports = angular.module('app.evolving.controller.table', [
  require('../services').name
])

.controller( 'TableController',
  /*@ngInject*/
  function TableController( $scope, DessertService ) {

    $scope.setTable = function() {
      DessertService.getRemotePies().then(function(result){
        $scope.pies = result;
      });
    };

    $scope.pies = null;

    $scope.getSilverWare = function(id) {
      return {'0' : 'Fork', '1' : 'Spoon', '2' : 'Knife' }[String(id)] || 'None';
    };
  }
)
