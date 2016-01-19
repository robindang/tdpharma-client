'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inventory', {
        url: '/inventory',
        templateUrl: 'app/inventory/index/inventory.html',
        controller: 'InventoryCtrl',
        controllerAs: 'ic'
      })
      .state('inventoryItem', {
        url: '/inventory/:id',
        templateUrl: 'app/inventory/item/inventoryItem.html',
        controller: 'InventoryItemCtrl',
        controllerAs: 'iic'
      });
  });