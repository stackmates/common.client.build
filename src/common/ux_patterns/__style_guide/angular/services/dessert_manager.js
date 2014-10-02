

'use strict';

module.exports = /*@ngInject*/
  function DessertManager (DessertValues){
    return {
      pieFlavors: function() {
        return DessertValues.pies.map(function (pie) {
          return pie.flavor;
        });
      },
      mode: function(dessert) {
        if (dessert === 'cake') {
          return 'pie';
        } else if (dessert === 'pie') {
          return 'cake';
        } else {
          return 'cake';
        }
      }
    };
  }


