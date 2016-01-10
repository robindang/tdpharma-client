'use strict';

angular.module('tdpharmaClientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'smart-table',
  'listGroup',
  'ui.select',
  'pascalprecht.translate',
  'ngFileUpload',
  'ngStorage'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .constant('APP_CONFIGURATION', {
    API_V1_URL: 'http://localhost:3000/api/v1/',
    // API_V1_URL: 'http://tdpos.herokuapp.com/api/v1/',
    SERVER_END_POINT: 'http://localhost:3000/',
    // SERVER_END_POINT: 'http://tdpos.herokuapp.com/',
    SERVER_DEFAULT_PICTURE_ENDPOINT: 'http://localhost:3000'
    // SERVER_DEFAULT_PICTURE_ENDPOINT: 'http://tdpos.herokuapp.com'
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookies, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      response: function(response) {
        if (response.data instanceof Object && response.data.authentication_token) {
          $cookies.put('token', response.data.authentication_token);
        }
        return $q.resolve(response);
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });