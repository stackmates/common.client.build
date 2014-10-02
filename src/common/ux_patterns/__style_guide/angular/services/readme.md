

questions

Make a decision on this

Always return a host Object instead of the revealing Module pattern **due to the way Object references are bound and updated**

function AnotherService () {
  var AnotherService = {};
  AnotherService.someValue = '';
  AnotherService.someMethod = function () {

  };
  return AnotherService;
}
angular
  .module('app')
  .factory('AnotherService', AnotherService);


**Why? : Primitive values cannot update alone using the revealing module pattern**
