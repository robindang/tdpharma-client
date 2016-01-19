'use strict';

angular.module('tdpharmaClientApp')
  .factory('InventoryItem', InventoryItem);

InventoryItem.$inject = ['$resource', 'APP_CONFIGURATION'];

function InventoryItem($resource, APP_CONFIGURATION) {
  return $resource(APP_CONFIGURATION.API_V1_URL+'inventory_items/:id/:controller', {
    id: '@_id',
    format: 'json'
  });
}
