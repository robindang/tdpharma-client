'use strict';

angular.module('tdpharmaClientApp')
  .factory('Medicine', Medicine);

Medicine.$inject = ['$resource', APP_CONFIGURATION];

function Medicine($resource, APP_CONFIGURATION) {
  return $resource(APP_CONFIGURATION.API_V1_URL+'medicines/:id/:controller', {
    id: '@_id',
    format: 'json'
  });
}