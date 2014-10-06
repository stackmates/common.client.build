'use strict';

module.exports = /*@ngInject*/
  function ($scope, $attrs, accordionConfig){
    // This array keeps track of the accordion groups
    this.groups = [];

    // Ensure that all the groups in this accordion are closed, unless close-others
    // explicitly says not to
    this.closeOthers = function(openGroup) {
      var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
      if ( closeOthers ) {
        angular.forEach(this.groups, function (group) {
          if ( group !== openGroup ) {
            group.isOpen = false;
          }
        });
      }
    };

    // This is called from the accordion-group directive to add itself to the accordion
    this.addGroup = function(groupScope) {
      var that = this;
      this.groups.push(groupScope);

      groupScope.$on('$destroy', function () {
        that.removeGroup(groupScope);
      });
    };

    // This is called from the accordion-group directive when removing itself
    this.removeGroup = function(group){
      var index = this.groups.indexOf(group);
      if ( index !== -1 ) {
        this.groups.splice(this.groups.indexOf(group), 1);
      }
    };

  };
