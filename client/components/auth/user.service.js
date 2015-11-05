'use strict';

angular.module('tdpharmaClientApp')
  .factory('User', function ($resource) {
    return $resource('http://localhost:3000/api/v1/users/:id/:controller', {
      id: '@_id',
      format: 'json'
    },
    {
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      update: {
        method: 'PATCH'
      },
      save: {
        method: 'POST',
        url: 'http://localhost:3000/users/:id/:controller'
      },
      signIn: {
        method: 'POST',
        url: 'http://localhost:3000/users/sign_in'
      }
	  });
  });
