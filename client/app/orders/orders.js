'use strict';

angular.module('tdpharmaClientApp')  
  .config(function($stateProvider){
    $stateProvider
      .state('listPurchases', {
        url: '/purchases',
        templateUrl: 'app/orders/purchases/purchases.html',
        controller: 'PurchasesCtrl',
        controllerAs: 'oc'
      });
  })
  .config(function($stateProvider){
    $stateProvider
      .state('listSales', {
        url: '/sales',
        templateUrl: 'app/orders/sales/sales.html',
        controller: 'SalesCtrl',
        controllerAs: 'oc'
      });
  })
  .config(function($stateProvider){
    $stateProvider
      .state('listAdjustments', {
        url: '/adjustments',
        templateUrl: 'app/orders/adjustments/adjustment.html',
        controller: 'AdjustmentsCtrl',
        controllerAs: 'oc'
      });
  })
  .config(function($stateProvider){
  	$stateProvider
      .state('newPurchases', {
    		url: '/purchases/new',
    		templateUrl: 'app/orders/purchases/new_purchase.html',
    		controller: 'newPurchaseCtrl',
    		controllerAs: 'vm'
    	});
  })
  .config(function($stateProvider){
    $stateProvider
      .state('orderItem', {
        url: '/orders/:id',
        templateUrl: 'app/orders/orderItem/orderItem.html',
        controller: 'OrderItemCtrl',
        controllerAs: 'vm'
      });
  });