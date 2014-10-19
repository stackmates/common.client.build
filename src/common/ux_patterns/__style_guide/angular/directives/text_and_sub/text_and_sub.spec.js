'use strict';

require('./text_and_sub');

// template based spec
describe('textAndSub', function () {
  var $rootScope,
      $scope,
      $compile,
      el,
      $el,
      $body = $('body'),
      simpleHtml = '<text-and-sub text="{{scopeText}}" sub="{{scopeSub}}"></text-and-sub>';

  beforeEach(function(){
    angular.mock.module(
      'app.evolving.components.textandsub'
    );

    inject(function ($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
      el = $compile(angular.element(simpleHtml))($scope);
    });

    $body.append(el);
    $rootScope.$digest();

    // Grabs from the body and confirms it was compiled out
    $el = $('.text-and-sub');

  });

  afterEach(function() {
    $body.empty();
  });

  it('renders the directive out in the dom', function () {
    expect($el.length).toEqual(1);
  });

  it('renders out the text when given in scope', function () {
    $scope.scopeText = "Jungle Land";
    $scope.$digest();
    expect($el.find('h3').text()).toEqual("Jungle Land");
  });

  it('renders out the sub when given in scope', function () {
    $scope.scopeSub = "Howzit";
    $scope.$digest();
    expect($el.find('h5').text()).toEqual("Howzit");
  });

  it('hides the sub text when it is not defined', function () {
    expect($el.find('h5').is(":visible")).toBeFalsy();
  });

  it('show the sub text when it is defined', function () {
    $scope.scopeSub = "I exist";
    $scope.$digest();
    expect($el.find('h5').is(":visible")).toBeTruthy();
  });


});

