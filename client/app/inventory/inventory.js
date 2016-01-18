'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory', {
        url: '/inventory',
        templateUrl: 'app/inventory/index/inventory.html',
        controller: 'InventoryCtrl',
        controllerAs: 'ic'
      })
      .state('inventoryItem', {
        url: '/inventory/:id',
        templateUrl: 'app/inventory/item/inventoryItem.html',
        controller: 'InventoryItemCtrl',
        controllerAs: 'iic'
      });
  })
  .factory('InventorySearch', ['$q', '$filter', '$timeout', '$cookies', 'InventoryItem', 'Category', function ($q, $filter, $timeout, $cookies, InventoryItem, Category) {

    function getPage(start, number, params) {

      var deferred = $q.defer();

      var query = {};
      number = 25;
      params = params || {};
      query.page = 1 + start / number;
      if (params.categoryId) query.category_id = params.categoryId;
      // var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

      // if (params.sort.predicate) {
      //   filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
      // }

      // var result = filtered.slice(start, start + number);

      InventoryItem.get(query, function(obj) {        
        deferred.resolve({
          data: obj.data.items,
          numberOfPages: Math.ceil(obj.data.total_count / number),
          numberOfResults: obj.data.total_count
        });
      });


      return deferred.promise;
    }

    return {
      getPage: getPage
    };

  }]);