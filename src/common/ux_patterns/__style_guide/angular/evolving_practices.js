'use strict';

module.exports = angular.module( 'app.evolvingpractices', [
  'ui.router',
  'restangular',
  require('./services').name,
  require('./directives').name,
])

  // require('./directives/directives').name
.config(
  function($stateProvider) {
    $stateProvider
      .state('app.evolvingpractices', {
        url: '/evolving-practices',
        views: {
          '@': {
            controller: 'DessertController',
            templateUrl: 'evolving_practices/templates/test_practices.html'
          }
        }
      });
  }
)

.controller( 'DessertController', require('./controllers/dessert_controller'))
.controller( 'TableController', require('./controllers/table_controller'))
// this controller in nested with TableController in the DOM
.controller( 'PlaceMatController', require('./controllers/placemate_controller'))


;

