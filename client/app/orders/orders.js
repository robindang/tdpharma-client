'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('orders', {
        url: '/orders',
        templateUrl: 'app/orders/orders.html',
        controller: 'OrdersCtrl',
        controllerAs: 'oc'
      });
  });