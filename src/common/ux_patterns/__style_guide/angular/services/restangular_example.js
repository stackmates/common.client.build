'use strict';

window._ = require('lodash');
require('restangular')

module.exports = angular.module('app.evolving.service.restangular', [
  'restangular'
])

.service('DemoRestangularService',
  /*@ngInject*/
  function DemoRestangularService ( Restangular ){

    // Public Object to be returned
    var DemoRestangular = {};

    // All URLs on searches will use `http://google.com/` as the baseUrl
    var _searches = Restangular.allUrl('searches', 'http://google.com/');

    // Will send a request to GET http://google.com/
    DemoRestangular.getList = _searches.getList();


    return DemoRestangular;

  }
)
