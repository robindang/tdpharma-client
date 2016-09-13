'use strict';

angular.module('tdpharmaClientApp', [
  'ngCookies',
  'ngLodash',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'angularMoment',
  'smart-table',
  'listGroup',
  'ui.odometer',
  'ui.select',
  'pascalprecht.translate',
  'ngFileUpload',
  'ngStorage',
  'toastr',
  'io-barcode',
  'ngLocale',
  'highcharts-ng'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function(toastrConfig) {
    angular.extend(toastrConfig, {
      closeButton: true,
      positionClass: 'toast-custom-top-right',
      timeOut: 5000
    });
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookies, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer '  + $cookies.get('token');
        }        
        return config;
      },

      response: function(response) {        
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