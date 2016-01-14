'use strict';

angular.module('tdpharmaClientApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $translate) {
    
    $scope.text = {
      company: 'Pharmaplus'
    }

    var current_user = Auth.getCurrentUser();
    if (current_user && current_user.preferred_language){
      $translate.use(current_user.preferred_language);
    }

  });
