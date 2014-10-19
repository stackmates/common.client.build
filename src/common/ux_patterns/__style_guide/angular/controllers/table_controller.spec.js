'use strict';

require('../');


describe('TableControllerCallingRemoveServiceExample', function () {
  var $rootScope,
      $scope,
      dessertServiceSpy,
      controller;

  beforeEach(function() {

    angular.mock.module('app');

    inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      dessertServiceSpy = spyOnAngularService(
        $injector.get("DessertService"), 'getRemotePies', {name: "This is a pie!"}
      );
      controller = $injector.get('$controller')('TableController', {$scope: $scope});
    });

  });


  describe('Initialization', function () {

    it('instantiates pies to null', function () {
      expect($scope.pies).toBeNull();
    });

  });

  describe('Action Handlers', function () {

    it('Calls the dessertService.getRemotePies method', function () {
      $scope.setTable();
      expect(dessertServiceSpy).toHaveBeenCalledWith();
    });

    it('Sets the pies to the result of the service call', function () {
      $scope.setTable();
      expect($scope.pies).toEqual({name: "This is a pie!"});
    });

    describe('Getters', function () {

      describe('getSilverware', function () {

        it('returns a fork for 0', function () {
          expect($scope.getSilverWare(0)).toEqual("Fork");
        });
        it('returns a spoon for 1', function () {
          expect($scope.getSilverWare(1)).toEqual("Spoon");
        });
        it('returns a fork for 2', function () {
          expect($scope.getSilverWare(2)).toEqual("Knife");
        });
        it('returns a None in other cases', function () {
          expect($scope.getSilverWare(3)).toEqual("None");
        });

      });
    });

  });


});
