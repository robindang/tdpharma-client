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
    width: 1,
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
  vm.updateTotalAmount = updateTotalAmount;
  vm.updateDeliveryDate = updateDeliveryDate;
  vm.updateDueDate = updateDueDate;
  vm.updateBatchSalePrice = updateBatchSalePrice;
  vm.reverseTransaction = reverseTransaction;
  vm.saveEdit = saveEdit;
  vm.goToItem = goToItem;

  //  Local methods
  var processData = processData;
  var initData = initData;
  var validateData = validateData;
  var buildParams = buildParams;

  initData();

  function processData(receipt) {
    _.each(receipt.transactions, function(t){
      t.is_collapsed = false;
      t.is_updated = moment(t.created_at).startOf('minute').isSame(moment(t.updated_at).startOf('minute')) ? false : true;      
      t.delivery_time = moment(t.delivery_time);
      t.due_date = moment(t.due_date);
      t.is_editting = false;
      // If this purchased batch is already on sale, can't edit.
      if (t.inventory_item_id && t.transaction_type === 'PurchaseTransaction') {
        t.is_editable = (t.med_batch.total_units == t.med_batch.amount_per_pkg * t.med_batch.number_pkg && t.inventory_item_id) ? true : false;  
      } 
      // If this is a sale, allow return
      else if (t.inventory_item_id && t.transaction_type === 'SaleTransaction' && t.status !== 'deprecated') {
        t.is_editable = true;
      }
      t.med_batch.mfg_date = moment(t.med_batch.mfg_date).startOf('day');
      t.med_batch.expire_date = moment(t.med_batch.expire_date).startOf('day');
      t.updated_at = moment(t.updated_at);
    });
    switch(receipt.receipt_type) {
      case 'purchase':
       vm.receipt_type = $filter('translate')('PURCHASE');
       vm.item_view = 'app/orders/orderItem/purchaseItem.html';       
       break;
      case 'sale':
        vm.receipt_type = $filter('translate')('SALE');
        vm.item_view = 'app/orders/orderItem/saleItem.html';
        break;
      default:
        vm.receipt_type = $filter('translate')('ADJUSTMENT');
        vm.item_view = 'app/orders/orderItem/adjustmentItem.html';
        break;
    }      
  }

  function initData() {
    Receipt.get({id: $stateParams.id}).$promise.then(function(resp){
      vm.receipt = resp;
      processData(vm.receipt);      
    }, function(error){
      toastr.error(error.data.errors);
    });

    User.query().$promise.then(function(resp){
      vm.store_users = resp;    
    }).catch(function(err){
        toastr.error(err.data.errors, $filter('translate')('TOASTR_SORRY'));
    });
  }

  function editTransaction(t) {
    if (t.is_editting === true) {return;}
    t.is_editting = true;
    vm.edit_transaction = angular.copy(t);
    if (vm.edit_transaction.med_batch) {
      vm.edit_transaction.med_batch.mfg_date = new Date(vm.edit_transaction.med_batch.mfg_date);
      vm.edit_transaction.med_batch.expire_date = new Date(vm.edit_transaction.med_batch.expire_date);
      vm.edit_transaction.delivery_time = new Date(vm.edit_transaction.delivery_time);
      vm.edit_transaction.due_date = new Date(vm.edit_transaction.due_date);
    }
    if (vm.edit_transaction.user_id) {
      vm.edit_user = _.find(vm.store_users, function(u){return u.id === vm.edit_transaction.user_id;});
    }    
  }

  function openCalendar(status, $event, $index) {
      vm[status] = vm[status] || [];
      vm[status][$index] = vm[status][$index] || {};
      vm[status][$index].opened = true;
    }

  function toOrders(receipt) {
    if (receipt.receipt_type === 'purchase') {
      $state.go('listPurchases');
    }
    else if (receipt.receipt_type === 'sale') {
      $state.go('listSales');
    }    
  }

  function reverseTransaction(t) {
    if (t.is_editting === true) {
      if (!vm.edit_transaction.notes) {
        toastr.error($filter('translate')('EXPLANATION_REQUIRED')); return;
      }
      var params = {
        receipt: { id: vm.receipt.id }
      };
      if (vm.receipt.receipt_type === 'purchase' && t.transaction_type === 'PurchaseTransaction') {
        params.receipt.purchase_transactions_attributes = [
          {
            id: t.id,
            status: 'deprecated',
            user_id: vm.edit_user.id,   
            paid: vm.edit_transaction.paid,
            performed: vm.edit_transaction.performed,
            notes: vm.edit_transaction.notes
          }
        ];        
      }
      if (vm.receipt.receipt_type === 'sale' && t.transaction_type === 'SaleTransaction') {
        params.receipt.sale_transactions_attributes = [
          {
            id: t.id,
            status: 'deprecated',
            user_id: vm.edit_user.id,
            paid: vm.edit_transaction.paid,
            performed: vm.edit_transaction.performed,
            notes: vm.edit_transaction.notes
          }
        ];        
      }
      Receipt.update({id: vm.receipt.id}, params).$promise.then(function(resp){
        vm.receipt = resp;
        processData(vm.receipt);
      }).catch(function(err){
        toastr.error(err.data.errors, $filter('translate')('TOASTR_SORRY'));
      });
    }
  }

  function updateTotalAmount(transaction) {
    if (transaction.med_batch.amount_per_pkg && transaction.med_batch.number_pkg) {
      transaction.amount = transaction.med_batch.amount_per_pkg * transaction.med_batch.number_pkg;      
    }
  }

  function updateDeliveryDate(transaction) {
    if (transaction.performed === false) {
      transaction.delivery_time = null;
    } else {
      transaction.delivery_time = new Date(moment().startOf('day'));
    }
  }

  function updateDueDate(transaction) {
    if (transaction.paid === false) {
      transaction.due_date = null;
    } else {
      transaction.due_date = new Date(moment().startOf('day'));
    }
  }

  function updateBatchSalePrice(transaction) {
    var unit_price = transaction.total_price / transaction.amount;
    vm.edit_transaction.total_price = unit_price * vm.edit_transaction.amount;
  }

  function validateData() {
    if (!vm.edit_user) {
      toastr.error($filter('translate')('AUTHOR_REQUIRED')); return false;
    }
    if (!vm.edit_transaction.med_batch.amount_per_pkg) {
      toastr.error($filter('translate')('AMOUNT_PER_PKG_REQUIRED')); return false;      
    }
    if (!vm.edit_transaction.med_batch.number_pkg) {
      toastr.error($filter('translate')('NUM_PACKAGE_REQUIRED')); return false;      
    }    
    if (!vm.edit_transaction.med_batch.mfg_date) {
      toastr.error($filter('translate')('MFG_DATE_REQUIRED')); return false;
    }
    if (!vm.edit_transaction.med_batch.expire_date) {
      toastr.error($filter('translate')('EXPIRE_DATE_REQUIRED')); return false;
    }
    if (vm.edit_transaction.performed === false && !vm.edit_transaction.delivery_time) {
      toastr.error($filter('translate')('DELIVERY_DATE_REQUIRED')); return false;
    }
    if (vm.edit_transaction.paid === false && !vm.edit_transaction.due_date) {
      toastr.error($filter('translate')('DUE_DATE_REQUIRED')); return false;
    }
    if (!vm.edit_transaction.total_price) {
      toastr.error($filter('translate')('PRICE_REQUIRED')); return false;
    }
    if (!vm.edit_transaction.notes) {
      toastr.error($filter('translate')('EXPLANATION_REQUIRED')); return false;
    }
    return true;
  }

  function buildParams(transaction) {
    var params = {
      receipt: {}
    };
    if (vm.receipt.receipt_type === 'purchase' && vm.edit_transaction.transaction_type === 'PurchaseTransaction') {
      var t = {
        id: transaction.id,
        amount: vm.edit_transaction.amount,        
        performed: vm.edit_transaction.performed,
        delivery_time: vm.edit_transaction.delivery_time,
        paid: vm.edit_transaction.paid,
        due_date:  vm.edit_transaction.due_date,
        notes: vm.edit_transaction.notes,
        user_id: vm.edit_user.id        
      };
      var b = {
        id: transaction.med_batch.id,
        amount_per_pkg: vm.edit_transaction.med_batch.amount_per_pkg,
        number_pkg: vm.edit_transaction.med_batch.number_pkg,
        mfg_date: moment(vm.edit_transaction.med_batch.mfg_date),
        expire_date: moment(vm.edit_transaction.med_batch.expire_date),
        package: vm.edit_transaction.med_batch.package
      };
      params.receipt.purchase_transactions_attributes = [t];
      params.receipt.med_batches_attributes = [b];
    }
    else if (vm.receipt.receipt_type === 'sale' && vm.edit_transaction.transaction_type === 'SaleTransaction') {
      params.receipt.sale_transactions_attributes = [
        {
          id: transaction.id,
          notes: vm.edit_transaction.notes,
          user_id: vm.edit_user.id,
          amount: vm.edit_transaction.amount,
          total_price: vm.edit_transaction.total_price          
        }
      ];
    }
    return params;
  }

  function saveEdit(transaction) {
    if (transaction.is_editting === true && validateData()) {
      var params = buildParams(transaction);
      Receipt.update({id: vm.receipt.id}, params).$promise.then(function(resp){
        vm.receipt = resp;
        processData(vm.receipt);
      }).catch(function(err){
        toastr.error(err.data.errors, $filter('translate')('TOASTR_SORRY'));
      })
    } 
  }

  function goToItem(transaction) {
    var id = transaction.inventory_item.id;    
    if (id) {
      $state.go('inventoryItem', {id: id});
    }    
  }

}