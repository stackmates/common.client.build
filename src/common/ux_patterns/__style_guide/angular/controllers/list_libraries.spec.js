'use strict';

// http://angular-tips.com/blog/2014/06/introduction-to-unit-test-controllers/

require('./list_libraries');


describe('Controller: ListLibrariesController', function() {
  var scope;
  var restService;
  var $location;


  beforeEach(function() {
    var mockRestService = {};
    module('app.evolution.restService', function($provide) {
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


});
