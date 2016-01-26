'use strict';

angular.module('tdpharmaClientApp')
  .factory('MedBatch', MedBatch);

MedBatch.$inject = ['$resource', 'APP_CONFIGURATION'];

function MedBatch($resource, APP_CONFIGURATION) {
  return $resource(APP_CONFIGURATION.API_V1_URL+'med_batches/:id/:controller', {
    id: '@_id',
    format: 'json'
  });
}