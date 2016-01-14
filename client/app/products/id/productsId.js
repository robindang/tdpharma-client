'use strict';

angular.module('tdpharmaClientApp')
  .controller('ProductsIdCtrl', ProductsIdCtrl);

ProductsIdCtrl.$inject = ['$stateParams', 'InventoryItem'];

function ProductsIdCtrl($stateParams, InventoryItem) {
  console.log($stateParams)
  var ctrl = this;
  ctrl.isReadOnly = true;
  InventoryItem.get($stateParams).$promise.then(function(item) {
    ctrl.item = item.data;
    console.log(item)
  })
}
