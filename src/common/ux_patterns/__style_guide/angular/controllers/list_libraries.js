'use strict';

module.exports = angular.module('app.evolving.controller.libraries', [
  require('../services/rest_service').name
])

.controller( 'ListLibrariesController',
  /*@ngInject*/
  function ListLibrariesController( $scope, $location, restService ) {


    restService.getAll().then(function(items) {
      $scope.libraries = items;
    });

    $scope.create = function() {
      restService.create($scope.newItemName).then(function(item) {
        $scope.libraries.push(item);
      });
    };

    $scope.goToDetails = function(library) {
      $location.path('/libraries/' + library.id + '/details');
    };


  }
)
