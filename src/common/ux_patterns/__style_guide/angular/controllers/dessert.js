'use strict';

module.exports = angular.module('app.evolving.controller.dessert', [
  require('../services').name
])

.controller( 'DessertController',
  /*@ngInject*/
  function DessertController( $scope, DessertManager ) {

    // Listeners
    $scope.$on('pieHasBeenDepleted', function(){
      $scope.warning = 'RED ALERT';
      $scope.slices = 0;
    });

    // Watchers
    function compareAndWarn(newVal, oldVal) {
      var props = [];
      if (newVal && oldVal) {
        for (var key in newVal) {
          if (newVal[key] > oldVal[key]) {
            props.push(key.charAt(0).toUpperCase() + key.slice(1));
          }
        }
      }
      return props;
    }

    $scope.$watch('nutritionalValue', function (newVal, oldVal) {
      var props = compareAndWarn(newVal, oldVal);
      if (props && props.length) {
        $scope.warning = props.join(', ') + ' have gone up!';
      } else {
        $scope.warning = null;
      }
    }, true );
    // deep watch when true to notice when any property on the hash changes


    // Action Handlers
    $scope.eatSlice = function() {
      if ($scope.slices) {
        $scope.slices--;
      }
    };

    $scope.toggleMode = function() {
      if (DessertManager.mode() === 'pie') {
        DessertManager.mode('cake');
      } else {
        DessertManager.mode('pie');
      }
    };

    this.requestFlavor = function(flavor) {
      $scope.lastRequestedFlavor = flavor;
    };

    $scope.lastRequestedFlavor = '';
    $scope.nutritionalValue = {calories: 500, fat:200, carbs:100};
    $scope.warning = null;
    $scope.slices = 8;

  }
)
