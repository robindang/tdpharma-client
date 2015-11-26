'use strict';

angular.module('tdpharmaClientApp')
  .service('serverConfig', function ($resource) {
    return $resource('http://localhost:3000/api/v1/configurations/:id', {
      id: '@_id',
      format: 'json'
    },
    {
      get: {
        method: 'GET'        
      }      
    });
  });