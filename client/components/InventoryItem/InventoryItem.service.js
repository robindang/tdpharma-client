'use strict';

angular.module('tdpharmaClientApp')
  .factory('InventoryItem', InventoryItem);

InventoryItem.$inject = ['$resource'];

function InventoryItem($resource) {
  return $resource('http://localhost:3000/api/v1/inventory_items/:id/:controller', {
    id: '@_id',
    format: 'json'
  });
}
