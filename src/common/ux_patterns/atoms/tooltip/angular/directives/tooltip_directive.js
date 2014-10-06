'use strict';

module.exports = /*@ngInject*/
  function tooltip ( $tooltip ) {
    return $tooltip( 'tooltip', 'tooltip', 'mouseenter' );
  }
