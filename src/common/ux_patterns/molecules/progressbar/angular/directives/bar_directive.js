'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function bar () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      require: '^progress',
      scope: {
          value: '=',
          type: '@'
      },
      // templateUrl: 'bar.html',
      template: fs.readFileSync(__dirname + '/templates/bar.html', 'utf8'),
      link: function(scope, element, attrs, progressCtrl) {
          progressCtrl.addBar(scope, element);
      }
    };
  }
