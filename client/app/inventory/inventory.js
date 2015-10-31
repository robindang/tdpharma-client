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
  .factory('Resource', ['$q', '$filter', '$timeout', '$cookies', 'Inventory', 'Category', function ($q, $filter, $timeout, $cookies, Inventory, Category) {

    function getPage(start, number, params) {

      var deferred = $q.defer();

      // var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

      // if (params.sort.predicate) {
      //   filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
      // }

      // var result = filtered.slice(start, start + number);

      Inventory.get({page: 1+start/number, email: $cookies.get('email'), token: $cookies.get('token')}, function(inventory) {
        inventory.data.items.forEach(function(x) {
          Category.get({email: $cookies.get('email'), token: $cookies.get('token'), id: x.category_id}, function(y) {
            x.categoryName = y.data.name;
          });
        });
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