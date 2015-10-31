'use strict';

angular.module('tdpharmaClientApp')
  .factory('Category', Category);

Category.$inject = ['$resource'];

function Category($resource) {
  return $resource('http://localhost:3000/api/v1/categories/:id/:controller', {
    id: '@_id',
    format: 'json'
  });
}