
// transitionend http://davidwalsh.name/css-animation-callback

var dom = require('domquery');
var transitionend = require('component-transitionend-property');

var classie = require('util_modules/classie_util');

var overlayMenu = function() {

  if (!document.getElementById('trigger-overlay')) return;

  // have a think about what is preferred, live with id or not?
  // TODO rename SiteNav--overlay to something like
  // Topbar--overlayMenu
	var triggerBttn = document.getElementById( 'trigger-overlay' );
  var overlay = document.querySelector( ('[data-js="SiteNavOverlay"]') );
  var toggle = document.querySelector('.toggle');

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
      classie.remove( toggle, 'is-visible' );

      classie.add( overlay, 'close' );
      classie.add( toggle, 'is-hidden');
			var onEndTransitionFn = function( ev ) {

			  if( ev.propertyName !== 'visibility' ) return;

        this.removeEventListener( transitionend , onEndTransitionFn, false);
				classie.remove( overlay, 'close' );
        classie.remove( toggle, 'is-hidden');

      };

      overlay.addEventListener( transitionend, onEndTransitionFn, false);

		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
      classie.add( toggle, 'is-hidden' );
		}

	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
};

module.exports = overlayMenu;
