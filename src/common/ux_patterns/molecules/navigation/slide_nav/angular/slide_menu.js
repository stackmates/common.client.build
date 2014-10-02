'use strict';


module.exports = angular.module('sm.slidemenu.directive', [

])


.factory('SlideMenuService', require('./service/slide_menu_service'))

.directive('slideMenuWrapper', require('./directives/wrapper_directive'))
.directive('slideMenuControl', require('./directives/control_directive'))
.directive('slideMenuReturn', require('./directives/toggle_directive'))

;
