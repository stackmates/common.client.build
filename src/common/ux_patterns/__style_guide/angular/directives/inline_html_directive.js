

module.exports = /*@ngInject*/
  function someDirective () {
    return {
      template: [
        '<div class="some-directive">',
          '<h1>My directive</h1>',
        '</div>'
      ].join('')
    };
  }


// Why? : Improves readability as code can be indented properly, it also avoids the + operator which is less clean and can lead to errors if used incorrectly to split lines

// TODO check out brfs
