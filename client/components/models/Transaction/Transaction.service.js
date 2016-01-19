'use strict';

angular.module('tdpharmaClientApp')
  .factory('Transaction', Transaction);

Transaction.$inject = ['$resource', 'APP_CONFIGURATION'];

function Transaction($resource, APP_CONFIGURATION) {
  return $resource(APP_CONFIGURATION.API_V1_URL+'transactions/:id/:controller', {
    id: '@_id',
    format: 'json'
  });
}