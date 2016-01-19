'use strict';

angular.module('tdpharmaClientApp')
  .factory('InventorySearch', InventorySearch);

InventorySearch.$inject = ['$q', '$filter', '$timeout', '$cookies', 'InventoryItem', 'Category'];

function InventorySearch($q, $filter, $timeout, $cookies, InventoryItem, Category) {
  // Service logic
  // ...

  var meaningOfLife = 42;

  // Public API here
  return {
    getPage: getPage
  };

  function getPage(start, number, params) {

    var deferred = $q.defer();

    var query = {};
    number = 25;
    params = params || {};
    query.page = 1 + start / number;
    if (params.categoryId) query.category_id = params.categoryId;
    if (params.q) query.search = params.q;
    if (params.inactive) query.inactive = true;
    
    InventoryItem.get(query, function(obj) {        
      deferred.resolve({
        data: obj.data.items,
        numberOfPages: Math.ceil(obj.data.total_count / number),
        numberOfResults: obj.data.total_count
      });
    });


    return deferred.promise;
  }
};
