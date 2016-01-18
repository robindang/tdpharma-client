'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkoutv2', {
        url: '/checkoutv2',
        templateUrl: 'app/checkoutv2/checkoutv2.html',
        controller: 'Checkoutv2Ctrl',
        controllerAs: 'cc'
      });
  });