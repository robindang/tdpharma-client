'use strict';

angular.module('tdpharmaClientApp')
  .controller('OrderItemCtrl', OrderItemCtrl);

OrderItemCtrl.$inject = ['Receipt', '$state', '$stateParams', '$filter', 'toastr', 'pharmacare'];

function OrderItemCtrl(Receipt, $state, $stateParams, $filter, toastr, pharmacare) {
	var vm = this;
  vm.receipt = {};
  vm.toOrders = toOrders;
  vm.pharmacare = pharmacare;

  initData();

  function initData() {
    Receipt.get({id: $stateParams.id}).$promise.then(function(resp){
      vm.receipt = resp.data;
      switch(vm.receipt.receipt_type) {
        case 'purchase':
         vm.receipt_type = $filter('translate')('PURCHASE');
         vm.item_view = 'app/orders/orderItem/purchaseItem.html';
         break;
        case 'sale':
          vm.receipt_type = $filter('translate')('SALE');
          vm.item_view = 'app/orders/orderItem/sale.html';
          break;
        default:
          vm.receipt_type = $filter('translate')('ADJUSTMENT');
          vm.item_view = 'app/orders/orderItem/adjustment.html';
          break;
      }      
    }, function(error){
      toastr.error(error.data.data.errors);
    })
  }

  function toOrders(){
    $state.go('orders');
  }
}