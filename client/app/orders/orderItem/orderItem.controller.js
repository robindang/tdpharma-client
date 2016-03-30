'use strict';

angular.module('tdpharmaClientApp')
  .controller('OrderItemCtrl', OrderItemCtrl);

OrderItemCtrl.$inject = ['Receipt', '$state', '$stateParams', '$filter', 'toastr', 'pharmacare', 'User'];

function OrderItemCtrl(Receipt, $state, $stateParams, $filter, toastr, pharmacare, User) {
	var vm = this;
  vm.receipt = {};
  vm.store_users = [];
  vm.edit_transaction = {};  
  vm.edit_user = {};
  vm.pharmacare = pharmacare;
  vm.barcode_style = {
    width: 2,
    height: 70,
    displayValue: true,
    fontSize: 14,
    font: 'helvetica'
  }  
  vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
  };
  vm.maxDate = new Date();
  vm.open = openCalendar;
  vm.toOrders = toOrders;   
  vm.print = pharmacare.barcodePrint;
  vm.editTransaction = editTransaction;

  initData();

  function initData() {
    Receipt.get({id: $stateParams.id}).$promise.then(function(resp){
      vm.receipt = resp.data;
      _.each(vm.receipt.transactions, function(t){
        t.is_collapsed = false;
        t.is_updated = moment(t.created_at).startOf('minute').isSame(moment(t.updated_at).startOf('minute')) ? false : true;
        t.is_editting = false;
      });
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
    });

    User.query().$promise.then(function(resp){
      vm.store_users = resp;    
    }).catch(function(err){
        toastr.error(err.data.data.errors, $filter('translate')('TOASTR_SORRY'));
    });
  }

  function editTransaction(t) {
    if (t.is_editting === true) {return;}
    t.is_editting = true;
    vm.edit_transaction = angular.copy(t);
    if (vm.edit_transaction.med_batch) {
      vm.edit_transaction.med_batch.mfg_date = new Date(moment(vm.edit_transaction.med_batch.mfg_date).startOf('day'));
      vm.edit_transaction.med_batch.expire_date = new Date(moment(vm.edit_transaction.med_batch.expire_date).startOf('day'));
    }
    if (vm.edit_transaction.purchase_user_id) {
      vm.edit_user = _.find(vm.store_users, function(u){return u.id === vm.edit_transaction.purchase_user_id;});
    }
    if (vm.edit_transaction.sale_user_id) {
      vm.edit_user = _.find(vm.store_users, function(u){return u.id === vm.edit_transaction.sale_user_id;});
    }
  }

  function openCalendar(status, $event, $index) {
      vm[status] = vm[status] || [];
      vm[status][$index] = vm[status][$index] || {};
      vm[status][$index].opened = true;
    }

  function toOrders(){
    $state.go('orders');
  }
}