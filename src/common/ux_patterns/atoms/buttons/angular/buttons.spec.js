
'use strict';

var app = require('./buttons');

describe('button directive', function () {

  var $compile;
  var $rootScope;

  beforeEach(function(){

    angular.mock.module('common.buttons');

    inject(function( _$compile_ , _$rootScope_ ){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });

  });

  it('adds a "btn" class to the button element', function () {
    var element = $compile('<button></button>')($rootScope);
    expect(element.hasClass('Button')).toBe(true);
  });

  it('adds size classes correctly', function () {
    var element = $compile('<button size="large"></button>')($rootScope);
    expect(element.hasClass('Button--large')).toBe(true);
  });

  it('adds a primary class to submit buttons', function () {
    var element = $compile('<button type="submit"></button>')($rootScope);
    expect(element.hasClass('Button--primary')).toBe(true);
  });

});
