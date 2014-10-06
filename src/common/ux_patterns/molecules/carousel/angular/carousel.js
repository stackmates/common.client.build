'use strict';

module.exports = angular.module('sm.molecules.carousel', [
  require('ux_patterns/_helpers/angular/transition').name
])

.controller('CarouselController', require('./controllers/carousel_controller'))

.directive('carousel', require('./directives/carousel_directive'))
.directive('slide', require('./directives/carousel_slide_directive'))

;
