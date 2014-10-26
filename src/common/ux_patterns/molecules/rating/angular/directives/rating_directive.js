'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function rating () {
    return {
      restrict: 'EA',
      require: ['rating', 'ngModel'],
      scope: {
        readonly: '=?',
        onHover: '&',
        onLeave: '&'
      },
      controller: 'RatingController',
      template: fs.readFileSync(__dirname + '/templates/rating.html', 'utf8'),
      // templateUrl: 'rating.html',
      replace: true,
      link: function(scope, element, attrs, ctrls) {
        var ratingCtrl = ctrls[0], ngModelCtrl = ctrls[1];

        if ( ngModelCtrl ) {
          ratingCtrl.init( ngModelCtrl );
        }
      }
    };
  }
