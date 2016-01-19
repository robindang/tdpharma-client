'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkoutv2', {
        url: '/checkoutv2',
        templateUrl: 'app/checkoutv2/index/checkoutv2.html',
        controller: 'Checkoutv2Ctrl',
        controllerAs: 'cc'
      })
      .state('checkoutConfirm', {
        url: '/checkout/confirm',
        templateUrl: 'app/checkoutv2/confirm/checkoutConfirm.html',
        controller: 'CheckoutConfirmCtrl',
        controllerAs: 'ccc'
      });
  });