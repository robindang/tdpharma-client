'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/index/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dc'
      });
  });