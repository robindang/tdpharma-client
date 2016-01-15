'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory', {
        url: '/inventory',
        templateUrl: 'app/inventory/index/inventory.html',
        controller: 'InventoryCtrl',
        controllerAs: 'mc'
      })
      .state('inventoryItem', {
        url: '/inventory/:id',
        templateUrl: 'app/inventory/item/inventoryItem.html',
        controller: 'InventoryItemCtrl',
        controllerAs: 'iic'
      });
  })
  .factory('Resource', ['$q', '$filter', '$timeout', '$cookies', 'InventoryItem', 'Category', function ($q, $filter, $timeout, $cookies, InventoryItem, Category) {

    function getPage(start, number, params) {

      var deferred = $q.defer();

      // var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

      // if (params.sort.predicate) {
      //   filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
      // }

      // var result = filtered.slice(start, start + number);

      InventoryItem.get({page: 1+start/number}, function(item) {        
        deferred.resolve({
          data: item.data.items,
          numberOfPages: Math.ceil(item.data.total_count / number),
          numberOfResults: item.data.total_count
        });
      });


      return deferred.promise;
    }

    return {
      getPage: getPage
    };

  }]);