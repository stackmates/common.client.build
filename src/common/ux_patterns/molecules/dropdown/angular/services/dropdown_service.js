'use strict';


module.exports = /*@ngInject*/
  function dropdownService ($document) {
    var openScope = null;

    this.open = function( dropdownScope ) {
      if ( !openScope ) {
        $document.bind('click', closeDropdown);
        $document.bind('keydown', escapeKeyBind);
      }

      if ( openScope && openScope !== dropdownScope ) {
          openScope.isOpen = false;
      }

      openScope = dropdownScope;
    };

    this.close = function( dropdownScope ) {
      if ( openScope === dropdownScope ) {
        openScope = null;
        $document.unbind('click', closeDropdown);
        $document.unbind('keydown', escapeKeyBind);
      }
    };

    var closeDropdown = function( evt ) {
      if (evt && evt.isDefaultPrevented()) {
          return;
      }

      openScope.$apply(function() {
        openScope.isOpen = false;
      });
    };

    var escapeKeyBind = function( evt ) {
      if ( evt.which === 27 ) {
        openScope.focusToggleElement();
        closeDropdown();
      }
    };
  }
