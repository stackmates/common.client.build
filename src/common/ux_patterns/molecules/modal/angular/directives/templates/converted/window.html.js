module.exports = angular.module("window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("window.html","<div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{\'z-index\': 1050 + index*10, display: \'block\'}\" ng-click=\"close($event)\">\n    <div class=\"modal-dialog\" ng-class=\"{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}\"><div class=\"modal-content\" modal-transclude></div></div>\n</div>\n");
}]);
