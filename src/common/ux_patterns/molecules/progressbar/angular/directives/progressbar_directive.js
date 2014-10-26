'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function progressBar () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      controller: 'ProgressController',
      scope: {
          value: '=',
          type: '@'
      },
      template: fs.readFileSync(__dirname + '/templates/progressbar.html', 'utf8'),
      link: function(scope, element, attrs, progressCtrl) {
          progressCtrl.addBar(scope, angular.element(element.children()[0]));
      }
    };
  }
