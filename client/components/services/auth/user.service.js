'use strict';

angular.module('tdpharmaClientApp')
.factory('TokenService', function ($resource, APP_CONFIGURATION) {
  return $resource(APP_CONFIGURATION.SERVER_END_POINT + '/oauth/token', {
    format: 'json'
  });
})
.factory('User', function ($resource, APP_CONFIGURATION) {
  return $resource(APP_CONFIGURATION.API_V1_URL+'users/:id/:controller', {
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
    query: {
      method: 'GET',
      isArray:true
    },
    update: {
      method: 'PATCH'
    },
    save: {
      method: 'POST',
      url: APP_CONFIGURATION.SERVER_END_POINT+'users/:id/:controller'
    },
    signIn: {
      method: 'POST',
      url: APP_CONFIGURATION.SERVER_END_POINT+'users/sign_in'
    }
  });
});
