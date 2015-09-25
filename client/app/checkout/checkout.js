'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'app/checkout/checkout.html',
        controller: 'CheckoutCtrl'
      });
  });