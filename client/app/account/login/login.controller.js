'use strict';

angular.module('tdpharmaClientApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $translate) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(resp) {
          // Set up user language
          var current_user = resp;
          if (current_user && current_user.preferred_language) {
            $translate.use(current_user.preferred_language);
          }                    
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message || 'Authentication failed';
        });
      }
    };

  });
