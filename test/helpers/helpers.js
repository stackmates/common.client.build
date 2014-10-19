
exports = module.exports = spyOnAngularService = function (service, methodName, result) {
  return spyOn(service, methodName).andReturn({then: function (fn) {
    fn(result);
  }});
};


beforeEach(function() {
  this.addMatchers({
    toHaveClass: function(cls) {
      this.message = function() {
        return "Expected '" + this.actual + "'" + (this.isNot ? ' not ' : ' ') + "to have class '" + cls + "'.";
      };

      return this.actual.hasClass(cls);
    },
    toBeHidden: function () {
      var element = angular.element(this.actual);
      return element.hasClass('ng-hide') ||
        element.css('display') == 'none';
    }
  });
});
