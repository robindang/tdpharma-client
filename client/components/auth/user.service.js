'use strict';

angular.module('tdpharmaClientApp')
  .factory('User', function ($resource) {
    return $resource('http://localhost:3000/api/v1/users/:id/:controller', {
      id: '@_id',
      format: 'json'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      save: {
        method: 'POST',
        url: 'http://localhost:3000/users/:id/:controller'
      }
	  });
  });
