'use strict';

require('../');

// Example of a controller nested inside another controller
// that uses a function inherited from the parent scope
describe('PlaceMatController', function () {
  var $rootScope,
      $scope,
      // create a controller service
      $controller,
      controller;

  beforeEach(function() {

    angular.mock.module('app.evolvingpractices');

    inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $controller = $injector.get('$controller');
      // get the parent controller
      var parent = $controller("TableController", {$scope: $scope});
      // then create a new scope from the parent controller scope
      // replicating the angular inheritance pattern
      $scope = $scope.$new();
      controller = $controller("PlaceMatController", {$scope: $scope });
    });

  });

  describe('Initialization', function () {

    it('sets $scope.fork to Fork', function () {
      expect($scope.fork).toEqual("Fork");
    });

    it('sets $scope.spoon to Spoon', function () {
      expect($scope.spoon).toEqual("Spoon");
    });

    it('sets $scope.knife to Knife', function () {
      expect($scope.knife).toEqual("Knife");
    });


  });
});
