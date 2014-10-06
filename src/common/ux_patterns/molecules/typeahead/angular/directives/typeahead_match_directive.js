'use strict';

var _o;

module.exports = /*@ngInject*/
  function typeaheadMatch ($http, $templateCache, $compile, $parse) {
    return {
      restrict:'EA',
      scope:{
        index:'=',
        match:'=',
        query:'='
      },
      link:function (scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'typeahead-match.html';
        $http.get(tplUrl, {cache: $templateCache}).success(function(tplContent){
           element.replaceWith($compile(tplContent.trim())(scope));
        });
      }
    };
  };



// <script type="text/ng-template" id="customTemplate.html">
//   <a>
//       <img ng-src="http://upload.wikimedia.org/wikipedia/commons/thumb/{{match.model.flag}}" width="16">
//       <span bind-html-unsafe="match.label | typeaheadHighlight:query"></span>
//   </a>
// </script>
