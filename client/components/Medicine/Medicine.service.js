'use strict';

angular.module('tdpharmaClientApp')
  .factory('Medicine', Medicine);

Medicine.$inject = ['$resource'];

function Medicine($resource) {
  return $resource('http://localhost:3000/api/v1/medicines/:id/:controller', {
    id: '@_id',
    format: 'json'
  });
}