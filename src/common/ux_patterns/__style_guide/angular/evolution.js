'use strict';

module.exports = angular.module( 'app.evolving', [
  'ui.router',
  'restangular',
  require('./services').name,
  require('./directives').name,
  require('./controllers/dessert').name
])

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

;

