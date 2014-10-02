
var _ = require('lodash');

module.exports = function(Handlebars) {

  Handlebars.registerHelper('selectCollection', function(collections, select, options) {
      var ret = "";

      if (select) {

        // console.log('select', select);
        // console.log('collections', collections[select]);
        if (collections[select] ) {

          var collection = collections[select];

          for(var i=0, j=collection.length; i<j; i++) {
            ret = ret + options.fn(collection[i]);
          }

          return ret;

        }

      }

  });

};

