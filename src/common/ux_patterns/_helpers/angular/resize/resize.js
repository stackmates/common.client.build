'use strict';

module.exports = angular.module('sm.resize',[

])

.directive('resize',
  /*@ngInject*/
  function ($window) {

    return function (scope, element, attr) {

        var w = angular.element($window);
        scope.$watch(function () {
            return {
                'h': window.innerHeight,
                'w': window.innerWidth
            };
        }, function (newValue, oldValue) {
            console.log(newValue, oldValue);
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.resizeWithRatio = function (ratio) {
                scope.$eval(attr.notifier);
                return {
                    'height': (newValue.h * (ratio/100)) + 'px'
                };
            };

            scope.resizeWithOffset = function (offsetH) {
                scope.$eval(attr.notifier);
                return {
                    'height': (newValue.h - offsetH) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }



  }
);
