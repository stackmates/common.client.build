'use strict';


module.exports = angular.module('sm.molecules.rating', [])

.constant('ratingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null
})

.controller('RatingController', require('./controllers/rating_controller'))

.directive('rating', require('./directives/rating_directive'))

;
