'use strict';


require('./size_check_directive');
// require('../services/desserts_service');
require('../../templates/templates');


describe('sizeCheck', function () {
  var $rootScope,
      $scope,
      el,
      $body = $('body'),
      simpleHtml = '<input ng-model="amountForTrade" size-check="10">';

  beforeEach(function() {

    //angular.mock.module('drmg');
    angular.mock.module('app.evolvingpractices.directives');

    inject(function ($injector, $compile) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      el = $compile(angular.element(simpleHtml))($scope);
    });

    $body.append(el);
    $rootScope.$digest();

  });

  afterEach(function() {
    $body.empty();
  });

  it('adds an invalid class when the value is greater than 10', function () {
    el.val('11');
    el.trigger('input');
    $scope.$digest();
    expect(el.hasClass('ng-invalid')).toBeTruthy();
    expect(el.hasClass('ng-invalid-too-big')).toBeTruthy();
  });

  it('adds a valid class when the value is less than 10', function () {
    el.val('9');
    el.trigger('input');
    $scope.$digest();
    expect(el.hasClass('ng-valid')).toBeTruthy();
    expect(el.hasClass('ng-valid-too-big')).toBeTruthy();
  });

  it('non number', function () {
    el.val('matt');
    el.trigger('input');
    $scope.$digest();
    expect(el.hasClass('ng-valid')).toBeTruthy();
    //expect(el.hasClass('ng-valid-too-big')).toBeTruthy();
  });

});
