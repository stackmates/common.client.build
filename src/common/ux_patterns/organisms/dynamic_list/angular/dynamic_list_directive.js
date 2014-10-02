'use strict';

var _o;

var imageTemplate = '<div class="entry-photo"><h2>&nbsp;</h2><div class="entry-img"><span><a href="{{rootDirectory}}{{content.data}}"><img ng-src="{{rootDirectory}}{{content.data}}" alt="entry photo"></a></span></div><div class="entry-text"><div class="entry-title">{{content.title}}</div><div class="entry-copy">{{content.description}}</div></div></div>';
var videoTemplate = '<div class="entry-video"><h2>&nbsp;</h2><div class="entry-vid"><iframe ng-src="{{content.sanitzedUrl}}" width="280" height="200" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div><div class="entry-text"><div class="entry-title">{{content.title}}</div><div class="entry-copy">{{content.description}}</div></div></div>';
var noteTemplate = '<div class="entry-note"><h2>&nbsp;</h2><div class="entry-text"><div class="entry-title">{{content.title}}</div><div class="entry-copy">{{content.data}}</div></div></div>';


module.exports = angular.module('common.directives.dynamic_list', [
  'ngSanitize'
])

// has a dependency on jQuery with show
.directive('dynamicList',
  function ( $compile, $sce ) {

    _o {
      $compile : $compile,
      $sce : $sce
    }

    // var getTemplate = function(contentType, content) {
    return {
      restrict: 'E',
      replace: true,
      link: link,
      scope: {
        content:'='
      }
    };

  }
);

function link (scope, element) {
  // TODO should pass this in
  scope.rootDirectory = 'assets/img/';
  var template = getTemplate(scope.content.content_type);
  if (scope.content.content_type === 'video') {
    scope.content.sanitzedUrl = trustSrc(scope.content.data);
  }
  element.html(template).show();
  element.replaceWith($compile(element.html())(scope));
};

function getTemplate (contentType) {
  var template = '';
  switch(contentType) {
    case 'image':
      // template = imageTemplate;
      template = require('./templates/dynamic_list_image');
      break;
    case 'video':
      template = videoTemplate;
      break;
    case 'notes':
      template = noteTemplate;
      break;
  }
  return template;
};

var trustSrc = function(src) {
  return _o.$sce.trustAsResourceUrl(src);
};

