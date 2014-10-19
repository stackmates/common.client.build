'use strict';

module.exports = angular.module('app.evolving.service.restService', [

])

.service('RestService',
  /*@ngInject*/
  function RestService (  ){

    return {
      getAll: function() {
        // We do a $http call to retrieve the stuff
      },
      create: function(itemName) {
        // We do a $http post to send the new one
      }
    }

  }
)
