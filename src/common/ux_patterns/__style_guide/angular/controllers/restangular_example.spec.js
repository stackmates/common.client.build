'use strict';

require('./restangular_example');

// http://stackoverflow.com/questions/18730522/injecting-mock-angular-service-dependencies
// http://angular-tips.com/blog/2014/06/introduction-to-unit-test-controllers/
// http://www.smashingmagazine.com/2014/10/07/introduction-to-unit-testing-in-angularjs/

describe('Controller with deps on restangular service', function () {
  var $rootScope,
      $scope,
      restangularServiceSpy,
      controller,
      Restangular;

  beforeEach(function() {

    // var restangularMock = {};
    // angular.module('app.evolving.service.restangular',[])
    //   .service('restangular',function () {
    //     return restangularMock;
    //   });

    angular.mock.module('app.evolving.controller.restangular');

    // create mock service
    // angular.mock.module(function($provide) {
    //   $provide.value('DemoRestangularService', restangularServiceSpy );
    //   $provide.value('Restangular', restangularMock);
    // });



    inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();

      restangularServiceSpy = spyOnAngularService(
        $injector.get("DemoRestangularService"), 'getList', {results: "search from google"}
      );
      controller = $injector.get('$controller')('RestangularExampleController', {$scope: $scope });
    });

  });


  describe('Initialization', function () {

    it('instantiates list to null', function () {
      expect($scope.list).toBeNull();
    });

  });

});
