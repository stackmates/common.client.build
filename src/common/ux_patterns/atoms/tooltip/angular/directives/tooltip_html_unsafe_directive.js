'use strict';

module.exports = /*@ngInject*/
  function tooltipHtmlUnsafe ( $tooltip ) {
    return $tooltip( 'tooltipHtmlUnsafe', 'tooltip', 'mouseenter' );
  };
