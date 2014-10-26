'use strict';

var fs = require('fs');

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
      // template: template: fs.readFileSync('ux_patterns/molecules/typeahead-match.html')
      templateUrl: 'typeahead-match.html',
      link:function (scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'typeahead-match.html';
        $http.get(tplUrl, {cache: $templateCache}).success(function(tplContent){
           element.replaceWith($compile(tplContent.trim())(scope));
        });
      }
    };
  };
