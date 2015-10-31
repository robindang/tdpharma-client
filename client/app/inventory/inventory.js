'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory', {
        url: '/inventory',
        templateUrl: 'app/inventory/inventory.html',
        controller: 'InventoryCtrl',
        controllerAs: 'mc'
      });
  })
  .factory('Resource', ['$q', '$filter', '$timeout', '$cookies', 'Inventory', function ($q, $filter, $timeout, $cookies, Inventory) {

    //this would be the service to call your server, a standard bridge between your model an $http

    // the database (normally on your server)
    var randomsItems = [];

    function createRandomItem(id) {
      var heroes = ['Batman', 'Superman', 'Robin', 'Thor', 'Hulk', 'Niki Larson', 'Stark', 'Bob Leponge'];
      return {
        id: id,
        name: heroes[Math.floor(Math.random() * 7)],
        age: Math.floor(Math.random() * 1000),
        saved: Math.floor(Math.random() * 10000)
      };

    }

    for (var i = 0; i < 1000; i++) {
      randomsItems.push(createRandomItem(i));
    }


    //fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
    //in our case, it actually performs the logic which would happened in the server
    function getPage(start, number, params) {

      var deferred = $q.defer();

      var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

      if (params.sort.predicate) {
        filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
      }

      var result = filtered.slice(start, start + number);

      Inventory.get({page: 1+start/number, email: $cookies.get('email'), token: $cookies.get('token')}, function(inventory) {
        console.log(inventory.data.items);
        deferred.resolve({
          data: inventory.data.items,
          numberOfPages: Math.ceil(inventory.data.total_count / number),
          numberOfResults: inventory.data.total_count
        });
      });


      return deferred.promise;
    }

    return {
      getPage: getPage
    };

  }]);