'use strict';

module.exports = angular.module( 'app.evolving', [
  'ui.router',
  'restangular',
  require('./services').name,
  require('./directives').name,
])

  // require('./directives/directives').name
.config(
  function($stateProvider) {
    $stateProvider
      .state('app.evolving', {
        url: '/evolving',
        views: {
          '@': {
            controller: 'DessertController',
            template: require('./templates/evolving.html')
          }
        }
      });
  }
)

.controller( 'DessertController',  require('./controllers/dessert_controller'))
.controller( 'TableController',    require('./controllers/table_controller'))
// this controller in nested with TableController in the DOM
.controller( 'PlaceMatController', require('./controllers/placemate_controller'))


;

