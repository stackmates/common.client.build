'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function progress () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      controller: 'ProgressController',
      require: 'progress',
      scope: {},
      template: fs.readFileSync(__dirname + '/templates/progress.html', 'utf8')
    };
  }
