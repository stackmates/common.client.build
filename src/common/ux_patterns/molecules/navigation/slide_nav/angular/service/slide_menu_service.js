'use strict';

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
            console.log('menuKey', menuKey);
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
              // Update asm-wrapper on whether it needs pushing aside
              // console.log(menuKey.substring(4).toLowerCase());

              // this.canPush = (menuKey.substring(0, 4) === 'push' && this.states[menuKey].active)
              //   ? menuKey.substring(4).toLowerCase() : null;
              // console.log(this.canPush);
              // console.log(menuKey + ' active: ' + this.states[menuKey].active);
              // Emit event
              $rootScope.$emit('slideMenuEvent', null);
            }
            else {
              console.log('Cannot toggle!');
            }
          }
          else {
            console.log('Unknown menu!');
          }
        }
    };
  };
