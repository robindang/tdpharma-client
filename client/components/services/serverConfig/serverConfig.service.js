'use strict';

angular.module('tdpharmaClientApp')
  .service('serverConfig', function ($resource, APP_CONFIGURATION) {
    return $resource(APP_CONFIGURATION.API_V1_URL+'configurations/:id', {
      id: '@_id',
      format: 'json'
    },
    {
      get: {
        method: 'GET'        
      }      
    });
  });