'use strict';

angular.module('tdpharmaClientApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $translate, $stateParams) {
    $scope.user = {};
    $scope.errors = {};

    // Without deliberate extra params, always perform log out as a precaution since 
    // there is must be something wrong with the user information to get to this page.         
    if (!$stateParams.extra) {
      Auth.logout();    
    }    

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
