'use strict';

var fs = require('fs');

module.exports = /*@ngInject*/
  function slide () {
    return {
      require: '^carousel',
      restrict: 'EA',
      transclude: true,
      replace: true,
      template: fs.readFileSync(__dirname + '/templates/slide.html', 'utf8'),
      scope: {
        active: '=?'
      },
      link: function (scope, element, attrs, carouselCtrl) {
        carouselCtrl.addSlide(scope, element);
        //when the scope is destroyed then remove the slide from the current slides array
        scope.$on('$destroy', function() {
          carouselCtrl.removeSlide(scope);
        });

        scope.$watch('active', function(active) {
          if (active) {
            carouselCtrl.select(scope);
          }
        });
      }
    };
  };


/**
 * @ngdoc directive
 * @name ui.bootstrap.carousel.directive:slide
 * @restrict EA
 *
 * @description
 * Creates a slide inside a {@link ui.bootstrap.carousel.directive:carousel carousel}.  Must be placed as a child of a carousel element.
 *
 * @param {boolean=} active Model binding, whether or not this slide is currently active.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
<div ng-controller="CarouselDemoCtrl">
  <carousel>
    <slide ng-repeat="slide in slides" active="slide.active">
      <img ng-src="{{slide.image}}" style="margin:auto;">
      <div class="carousel-caption">
        <h4>Slide {{$index}}</h4>
        <p>{{slide.text}}</p>
      </div>
    </slide>
  </carousel>
  Interval, in milliseconds: <input type="number" ng-model="myInterval">
  <br />Enter a negative number to stop the interval.
</div>
  </file>
  <file name="script.js">
function CarouselDemoCtrl($scope) {
  $scope.myInterval = 5000;
}
  </file>
  <file name="demo.css">
    .carousel-indicators {
      top: auto;
      bottom: 15px;
    }
  </file>
</example>
*/
