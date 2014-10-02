'use strict';


require('./stateful_directive');
require('../services');
require('../../templates/templates');

describe('stateful', function () {
  var $rootScope,
      $scope,
      $compile,
      el,
             dessertLog,
      $body = $('body'),
      simpleHtml = '<button stateful="red"></button>';

  beforeEach(function () {

    //angular.mock.module('drmg');
    angular.mock.module('app.evolvingpractices.directives');

    inject(function ($injector) {
      dessertLog = $injector.get('DessertLog');
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $compile = $injector.get('$compile');
      el = $compile(angular.element(simpleHtml))($scope);

    });

    $body.append(el);
    $rootScope.$digest();

  });

  it('Should be able to toggle the class based on clicks', function () {

    expect(el.hasClass("red")).toBeFalsy();
    el.click();
    $scope.$digest();
    expect(el.hasClass('red')).toBeTruthy();
    el.click();
    $scope.$digest();
    expect(el.hasClass('red')).toBeFalsy();
    el.click();
    $scope.$digest();
    expect(el.hasClass('red')).toBeTruthy();
  });

  it('Should throw an error when compiled with an empty state', function () {
    expect(function() {
      $compile(angular.element('<a stateful></a>'))($scope);
    }).toThrow();
  });

  describe('Methods', function () {

    // to get child scope from parent due to setting scope: true in directive
    var myScope;

    beforeEach(function(){
      // can use $$childHead or $$childTail as the scope only has one child
      myScope = $scope.$$childHead;
    });

    describe('LogNodeBehaviour', function () {

      it("adds a message to the dessertLog when called with a message", function(){
        expect(dessertLog.messages).toEqual([]);
        myScope.logNodeBehaviour("This is my message");
        expect(dessertLog.messages.length).toEqual(1);
        expect(dessertLog.messages).toContain("This is my message");
      });

    });
  });
});
