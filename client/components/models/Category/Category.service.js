'use strict';

angular.module('tdpharmaClientApp')
  .factory('Category', Category);

Category.$inject = ['$resource', 'APP_CONFIGURATION'];

function Category($resource, APP_CONFIGURATION) {
  return $resource(APP_CONFIGURATION.API_V1_URL+'categories/:id/:controller', {
    id: '@_id',
    format: 'json'
  });
}