'use strict';

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
module.exports = angular.module( 'sm.atoms.tooltip', [
  require('ux_patterns/_helpers/angular/position').name,
  require('ux_patterns/_helpers/angular/bind_html').name
])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider( '$tooltip',                require('./services/tooltip_service'))

.directive( 'tooltipPopup',           require('./directives/tooltip_popup_directive'))
.directive( 'tooltip',                require('./directives/tooltip_directive'))
.directive( 'tooltipHtmlUnsafePopup', require('./directives/tooltip_html_unsafe_popup_directive'))
.directive( 'tooltipHtmlUnsafe',      require('./directives/tooltip_html_unsafe_directive'))

;
