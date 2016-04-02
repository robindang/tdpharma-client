'use strict';

angular.module('tdpharmaClientApp')
  .factory('Receipt', Receipt);

Receipt.$inject = ['$resource', 'APP_CONFIGURATION'];

function Receipt($resource, APP_CONFIG) {
  return $resource(APP_CONFIG.API_V1_URL+'receipts/:id/:controller', {
    id: '@_id',
    format: 'json'
  }, {
    'update': { method:'PUT' }
  });
}