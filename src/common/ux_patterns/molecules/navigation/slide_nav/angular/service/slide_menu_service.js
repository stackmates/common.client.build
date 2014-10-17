'use strict';

var debug = require('debug')('slideMenu');

module.exports = /*@ngInject*/
  function SlideMenuService ($rootScope) {
    return {
        // This object tracks the status of each window and whether or not
        // it must be the only active window at a given time
        states: {
            'left'   : {active: false, exclusive: false}
          , 'right'  : {active: false, exclusive: false}
          , 'top'    : {active: false, exclusive: false}
          , 'bottom' : {active: false, exclusive: false}
        }

        // This object tracks whether or not to push the asm-wrapper
      , canPush: null

        /** This function toggles one of the menus listed in asmStates from
         *  active to inactive and vice-versa based on certain criteria.
         *  @param menuKey the menu to attempt to toggle
         */
      , toggle: function(menuKey) {
          if (this.states.hasOwnProperty(menuKey)) {

            var menuValue = this.states[menuKey];
            var canToggle = true;
            var key = null
            for (key in this.states) {
              var value = this.states[key];
              // Ensure that no other exclusive menus are active, and do not
              // activate an exclusive menu if any other menu is active.
              //if (key === menuKey) {
              //  continue;
              //}
              if ((key !== menuKey) && (value.active && (value.exclusive || menuValue.exclusive))) {
                canToggle = false;
                break;
              }
            }
            if (canToggle) {
              this.states[menuKey].active = !this.states[menuKey].active;

              if ( this.canPush ) {
                this.canPush = null;
              } else {
                this.canPush = menuKey;
              }
              $rootScope.$emit('slideMenuEvent', null);
            }
            else {
              debug('Cannot toggle!');
            }
          }
          else {
            debug('Unknown menu!');
          }
        }
    };
  };
