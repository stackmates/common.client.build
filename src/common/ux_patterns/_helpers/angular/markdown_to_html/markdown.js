'use strict';

var Showdown = require('showdown');

module.exports = angular.module('common.markdown', [])

.directive('markdown', function () {
  var converter = new Showdown.converter();
  return {
    restrict: 'AE',
    link: function (scope, element, attrs) {
      if (attrs.markdown) {
        scope.$watch(attrs.markdown, function (newVal) {
          if (newVal) {
            var html = converter.makeHtml(newVal);
            element.html(html);
          }
        });
      } else {
        var html = converter.makeHtml(element.text());
        element.html(html);
      }
    }
  };
});
