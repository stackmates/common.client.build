module.exports = angular.module("typeahead-match.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("typeahead-match.html",
    "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>\n");
}]);



