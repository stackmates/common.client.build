"use strict";


/**
 * Add querySelectorAll() to jqLite.
 *
 * jqLite find() is limited to lookups by tag name.
 * TODO This will change with future versions of AngularJS, to be removed when this happens
 *
 * See jqLite.find - why not use querySelectorAll? https://github.com/angular/angular.js/issues/3586
 * See feat(jqLite): use querySelectorAll instead of getElementsByTagName in jqLite.find https://github.com/angular/angular.js/pull/3598
 */
if (angular.element.prototype.querySelectorAll === undefined) {
  angular.element.prototype.querySelectorAll = function(selector) {
    return angular.element(this[0].querySelectorAll(selector));
  };
}

module.exports = angular.module('ui.select', [])

.constant('uiSelectConfig', {
  theme: 'bootstrap',
  searchEnabled: true,
  placeholder: '', // Empty by default, like HTML tag <select>
  refreshDelay: 1000 // In milliseconds
})

.service('uiSelectMinErr', require('./services/select_min_error'))
.service('RepeatParser', require('./services/repeat_parser'))

.controller('uiSelectCtrl', require('./controllers/select_controller'))

.directive('uiSelect', require('./directives/select'))
.directive('uiSelectChoices', require('./directives/select_choices'))
.directive('uisTranscludeAppend', require('./directives/transclude_append'))
.directive('uiSelectMatch', require('./directives/select_match'))

.filter('highlight', require('./filters/highlight_filter'))

;
