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
  })
  .config(function($stateProvider){
  	$stateProvider.state('newPurchases', {
  		url: '/purchases',
  		templateUrl: 'app/orders/purchases/new_purchase.html',
  		controller: 'newPurchaseCtrl',
  		controllerAs: 'vm'
  	});
  });