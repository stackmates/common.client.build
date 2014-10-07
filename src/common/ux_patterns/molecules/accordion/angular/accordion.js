'use strict';

module.exports = angular.module('sm.molecules.accordion', [
  require('ux_patterns/_helpers/angular/collapse').name
])

.constant('accordionConfig', { closeOthers: true })

.controller('smAccordionController', require('./controllers/accordion_controller'))

.directive('accordion',            require('./directives/accordion_directive'))
.directive('accordionGroup',       require('./directives/accordion_group_directive'))
.directive('accordionHeading',     require('./directives/accordion_heading_directive'))
.directive('accordionTransclude',  require('./directives/accordion_transclude_directive'))

;
