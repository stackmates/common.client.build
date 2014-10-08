'use strict';

var _ = require('lodash');


module.exports = /*@ngInject*/
  function fuzzySearch() {
    return function (items, searchText) {
      var searchWords;

      if (searchText) {
        searchWords = searchText.split(' ');

        return _.filter(items, function (item) {
          var itemText = _.values(item).join(' ').toLowerCase();

          return _.every(searchWords, function (searchWord) {
            return itemText.search(searchWord.toLowerCase()) !== -1;
          });
        });
      } else {
        // return items;
        return [];
      }
    };
  };
