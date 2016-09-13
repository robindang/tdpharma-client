'use strict';

angular.module('tdpharmaClientApp')
  .factory('InventorySearch', InventorySearch);

InventorySearch.$inject = ['$q', '$filter', '$timeout', '$cookies', 'InventoryItem'];

function InventorySearch($q, $filter, $timeout, $cookies, InventoryItem) {
  // Service logic
  // ...

  // Public API here
  return {
    getPage: getPage,
    getItemPage: getItemPage,
  };

  function getItemPage(item) {
    var deferred = $q.defer();
    var query = {};
    var number = 25;
    query.inventory_id = item.id;
    InventoryItem.get(query, function(objs){
      deferred.resolve({
        data: objs.items,
        numberOfPages: Math.ceil(objs.total_count / number),
        numberOfResults: objs.total_count,
        current_page: objs.page
      });
    })
    return deferred.promise;
  }

  function getPage(start, number, params) {

    var deferred = $q.defer();

    var query = {};
    number = 25;
    params = params || {};
    query.page = 1 + start / number;
    if (params.categoryId) {query.category_id = params.categoryId;}
    if (params.q) {query.search = params.q;}
    if (params.inactive) {query.inactive = true;}
    
    InventoryItem.get(query, function(obj) {        
      deferred.resolve({
        data: obj.items,
        numberOfPages: Math.ceil(obj.total_count / number),
        numberOfResults: obj.total_count,
        current_page: obj.page
      });
    });


    return deferred.promise;
  }
}
