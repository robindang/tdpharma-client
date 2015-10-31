'use strict';

angular.module('tdpharmaClientApp')
  .factory('Inventory', Inventory);

Inventory.$inject = ['$resource'];

function Inventory($resource) {
  return $resource('http://localhost:3000/api/v1/inventory_items/:id/:controller', {
    id: '@_id',
    format: 'json'
  });
};
