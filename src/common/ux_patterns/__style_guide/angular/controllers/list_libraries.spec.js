'use strict';


// https://blog.codecentric.de/en/2014/08/angularjs-browserify/
// http://angular-tips.com/blog/2014/06/introduction-to-unit-test-controllers/

require('./list_libraries');


describe('Controller: ListLibrariesController', function() {
  var scope;
  var restService;
  var $location;


  beforeEach(function() {
    var mockRestService = {};
    angular.mock.module('app.evolving.controller.libraries', function($provide) {
      $provide.value('restService', mockRestService);
    });

    inject(function($q) {
      mockRestService.data = [
        {
          id: 0,
          name: 'Angular'
        },
        {
          id: 1,
          name: 'Ember'
        },
        {
          id: 2,
          name: 'Backbone'
        },
        {
          id: 3,
          name: 'React'
        }
      ];

      mockRestService.getAll = function() {
        var defer = $q.defer();

        defer.resolve(this.data);

        return defer.promise;
      };

      mockRestService.create = function(name) {
        var defer = $q.defer();

        var id = this.data.length;

        var item = {
          id: id,
          name: name
        };

        this.data.push(item);
        defer.resolve(item);

        return defer.promise;
      };
    });
  });


  // If you try to use module() after we used inject() angular will throw an exception.
  // So because of that, we need to do this in this concrete order

  // use spy when possible and mocks if we need to tests promises.

  beforeEach(inject(function($controller, $rootScope, _$location_, _restService_) {
    scope = $rootScope.$new();
    $location = _$location_;
    restService = _restService_;

    $controller('ListLibrariesController',
                  {$scope: scope, $location: $location, restService: restService });

    scope.$digest();

  }));

  // Here we inject a bunch of stuff and we assign them to our local variables. You can notice here that we are injecting the restService here and on the last article we did not. Both options are good. You can create a mock, save it on a variable and use it when needed (as we did on the

  it('should contain all the libraries at startup', function() {
    expect(scope.libraries).toEqual([
      {
        id: 0,
        name: 'Angular'
      },
      {
        id: 1,
        name: 'Ember'
      },
      {
        id: 2,
        name: 'Backbone'
      },
      {
        id: 3,
        name: 'React'
      }
    ]);
  });

  it('should create new libraries and append it to the list', function() {
    // We simulate we entered a new library name
    scope.newItemName = "Durandal";

    // And that we clicked a button or something
    scope.create();

    var lastLibrary = scope.libraries[scope.libraries.length - 1];

    expect(lastLibrary).toEqual({
      id: 4,
      name: 'Durandal'
    });
  });

  it('should redirect us to a library details page', function() {
    spyOn($location, 'path');

    var aLibrary = scope.libraries[0];

    // We simulate we clicked a library on the page
    scope.goToDetails(aLibrary);

    expect($location.path).toHaveBeenCalledWith('/libraries/0/details');
  });



});
