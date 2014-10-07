'use strict';

module.exports = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  HOME: 36,
  END: 35,
  BACKSPACE: 8,
  DELETE: 46,
  isControl: function (e) {
      var k = e.which;
      switch (k) {
      case KEY.SHIFT:
      case KEY.CTRL:
      case KEY.ALT:
          return true;
      }

      if (e.metaKey) return true;

      return false;
  },
  isFunctionKey: function (k) {
      k = k.which ? k.which : k;
      return k >= 112 && k <= 123;
  },
  isVerticalMovement: function (k){
    return ~[KEY.UP, KEY.DOWN].indexOf(k);
  },
  isHorizontalMovement: function (k){
    return ~[KEY.LEFT,KEY.RIGHT,KEY.BACKSPACE,KEY.DELETE].indexOf(k);
  }
};
