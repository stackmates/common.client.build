

'use strict';

module.exports = /*@ngInject*/
  function DessertService ($http ){

    // All URLs on searches will use `http://google.com/` as
    // the baseUrl
    // var searches = Restangular.allUrl('searches', 'http://google.com/');
    // // Will send a request to GET http://google.com/
    // searches.getList();

    return {
      getRemotePies: function() {
        return $http.get({method: 'GET', url: '/someUrl'});
      }
    };

  }
