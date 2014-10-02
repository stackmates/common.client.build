'use strict';

require('../../index');

describe('DessertController', function () {
  var $rootScope,
      $scope,
      dessertManager,
      controller;

  beforeEach(function(){

    angular.mock.module('app.evolvingpractices');

    inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      dessertManager = $injector.get('DessertManager');
      controller = $injector.get('$controller')('DessertController', {$scope:$scope});
    });

    // fire this here to replicate DOM behaviour for watchers
    $scope.$digest();

  });

  describe('initialization', function () {

    it('should initiate slices to 8', function () {
      expect($scope.slices).toEqual(8);
    });

    it('lastRequestedFlavor', function () {
      expect($scope.lastRequestedFlavor).toEqual("");
    });

    it('sets the default nutritionalValue data', function () {
      expect($scope.nutritionalValue).toEqual({calories: 500, fat:200, carbs:100});
    });

    it('set the warning to null', function () {
      expect($scope.warning).toBeNull();
    });
  });

  describe('Action handlers', function () {
    describe('eatSlice', function () {

      it('Should decrement the number of slices', function () {
        expect($scope.slices).toEqual(8);
        $scope.eatSlice();
        expect($scope.slices).toEqual(7);
      });

      it('Should do nothing when slices are 0', function () {
        $scope.slices = 0;
        $scope.eatSlice();
        expect($scope.slices).toEqual(0);
      });

    });

    describe('Request Flavor', function () {

      it('Should set $scope.lastRequestedFlavor to the passed in argument', function () {
        controller.requestFlavor('Cherry');
        expect($scope.lastRequestedFlavor).toEqual('Cherry');
      });
    });

    describe('toggleMode', function () {
      var modeSpy;

      beforeEach(function() {
        modeSpy = spyOn(dessertManager, 'mode').andReturn('pie');
      });


      it('switches mode to cake whenever the mode is "pie"', function () {
        $scope.toggleMode();
        expect(modeSpy).toHaveBeenCalledWith("cake");
      });

      it('switches mode to pie whenever the mode is anything other that "pie"', function() {
        modeSpy = modeSpy.andReturn("cupcake");
        $scope.toggleMode();
        expect(modeSpy).toHaveBeenCalledWith("pie");
      });



    });


  });

  describe('Listeners', function () {

    describe('pieHasBeenDepleted', function () {

      it('sets a WARNING to RED ALERT', function () {
        $rootScope.$broadcast("pieHasBeenDepleted");
        $rootScope.$digest();
        expect($scope.warning).toEqual("RED ALERT");
      });

      it('sets slices to zero', function () {
        $rootScope.$broadcast("pieHasBeenDepleted");
        $rootScope.$digest();
        expect($scope.slices).toEqual(0);
      });

    });
  });


  describe('watchers', function () {


    describe('nutritionalValue', function () {

      it('sets a warning that Carbs have gone up, when only carbs go up', function () {
        $scope.nutritionalValue.carbs++;
        $scope.$digest();
        expect($scope.warning).toEqual("Carbs have gone up!");
      });

      it('sets a warning that Fat have gone up, when only fat go up', function () {
        $scope.nutritionalValue.fat++;
        $scope.$digest();
        expect($scope.warning).toEqual("Fat have gone up!");
      });


      it('sets a warning that Calories have gone up, when only calories go up', function () {
        $scope.nutritionalValue.calories++;
        $scope.$digest();
        expect($scope.warning).toEqual("Calories have gone up!");
      });

      it('create a list of specific attributes that have gone up', function () {
        $scope.nutritionalValue.carbs++;
        $scope.nutritionalValue.fat++;
        $scope.nutritionalValue.calories++;
        $scope.$digest();
        expect($scope.warning).toEqual("Calories, Fat, Carbs have gone up!");
      });

      it('sets the warning to null if nothing goes up', function () {
        expect($scope.warning).toBeNull();
      });

      it('does not set a warning if results go down', function () {
        $scope.nutritionalValue.carbs--;
        $scope.nutritionalValue.fat--;
        $scope.nutritionalValue.calories--;
        $scope.$digest();
        expect($scope.warning).toBeNull();
      });

    });



  });


});
