'use strict';

require('../services');
// require('./dessert_manager');


describe('DessertManager', function () {
  var values, factory;

  beforeEach(function() {
    angular.mock.module('app.evolvingpractices.services');

    inject(function ($injector) {
      values = $injector.get('DessertValues');
      factory = $injector.get('DessertManager');
    });

  });


  describe('DessertValues', function () {


    it('Should intantiate with 3 pie flavors', function () {
      expect(values.pies).toEqual([
        {flavor: "Cherry", score: 6},
        {flavor: "Apple", score: 7.5},
        {flavor: "Peach", score: 4}
      ]);
    });

  });

  describe('DessertManager', function () {
    describe('Pie Flavors', function () {
      describe('A good pie manager', function () {

        it('returns 3 pies flavor strings', function () {
            var flavors = factory.pieFlavors();
            expect(flavors.length).toEqual(3);
            // these tests work best against static data
            expect(flavors[0]).toEqual("Cherry");
            expect(flavors[1]).toEqual("Apple");
            expect(flavors[2]).toEqual("Peach");
        });

        it('throws an error if the are no pies', function () {

          values.pies = null;

          expect(function() {
            factory.pieFlavor();
          }).toThrow();

          values.pies = [
            {flavor: "Cherry", score: 6},
            {flavor: "Apple", score: 7.5},
            {flavor: "Peach", score: 4}
          ];

        });

      });
      describe('A useless pie manager', function () {
        // body...
      });
    });
  });


});
