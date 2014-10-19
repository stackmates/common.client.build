
exports = module.exports = spyOnAngularService = function (service, methodName, result) {

  return spyOn(service, methodName).andReturn({then: function (fn) {
    fn(result);
  }});

};

