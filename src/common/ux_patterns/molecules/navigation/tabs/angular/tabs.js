'use strict';

module.exports = angular.module('sm.molecules.tabs', [])

.controller('TabsetController', require('./controllers/tabset_controller'))

.directive('tabset',               require('./directives/tabset_directive'))
.directive('tab',                  require('./directives/tab_directive'))
.directive('tabHeadingTransclude', require('./directives/tab_heading_transclude'))
.directive('tabContentTransclude', require('./directives/tab_content_transclude'))

;
