'use strict';

angular.module('tdpharmaClientApp')
  .factory('OrderSearch', OrderSearch);

OrderSearch.$inject = ['$q', 'Receipt'];

function OrderSearch($q, Receipt) {
  // Service logic
  // ...

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
    if (params.purchase) {
      query.purchase = params.purchase;
    } else if (params.sale) {
      query.sale = params.sale;
    } else if (params.adjustment) {
      query.adjustment = params.adjustment;
    }
    if (params.max_date) {
      query.max_date = params.max_date;
    }
    if (params.min_date) {
      query.min_date = params.min_date;
    }
    
    Receipt.get(query, function(obj) {        
      deferred.resolve({
        data: obj.data.receipts,
        numberOfPages: Math.ceil(obj.data.total_count / number),
        numberOfResults: obj.data.total_count
      });
    });


    return deferred.promise;
  }
}
