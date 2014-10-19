'use strict';

// window._ = require('lodash');
// require('restangular');

module.exports = angular.module('app.evolving.controller.restangular', [
  'restangular',
  require('../services/restangular_example').name
])

.controller( 'RestangularExampleController',
  /*@ngInject*/
  function RestangularExampleController( $scope, DemoRestangularService ) {

    $scope.list = null;

  }
)
