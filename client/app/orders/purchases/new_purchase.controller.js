  'use strict';

  angular.module('tdpharmaClientApp')
    .controller('newPurchaseCtrl', newPurchaseCtrl);

  newPurchaseCtrl.$inject = ['Receipt', '$state', 'InventorySearch', 'pharmacare', 'User', 'toastr', '$filter'];

  function newPurchaseCtrl(Receipt, $state, InventorySearch, pharmacare, User, toastr, $filter) {
    var vm = this;

    vm.selected_med = '';
    vm.store_users = [];
    vm.item_list = [];
    vm.maxDate = new Date();
    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    vm.searchMedicine = searchMedicine;
    vm.addItem = addItem;
    vm.pharmacare = pharmacare; 
    vm.open = openCalendar;
    vm.updateTotalAmount = updateTotalAmount;
    vm.removeItem = removeItem;
    vm.savePurchase = savePurchase;

    InitData();

    function InitData() {
      User.query().$promise.then(function(resp){
          vm.store_users = resp;
          if (!vm.store_users.length) {return;}
          vm.selected_user = vm.store_users[0];
          User.get().$promise.then(function(user) {
            vm.selected_user = vm.store_users.find(function(x) {return x.id===user.id;});          
          });
      }).catch(function(err){
        toastr.error(err.data.errors, $filter('translate')('TOASTR_SORRY'));
      });
    }

    function searchMedicine(search_string, force) {
      if ((search_string && search_string.length > 3) || force === true) {
        InventorySearch.getPage(0, 25, {q: search_string}).then(function(resp){
          vm.store_medicines = resp.data;        
        }).catch(function(error){
          toastr.error(error.data.errors);
        });
      }      
    }

    function addItem(item, model) {
      item.med_batches_attributes = [{
        medicine_id: item.itemable.id,
        inventory_item_id: item.id,
        user_id: vm.selected_user.id,
        category_id: item.category.id 
      }];
      vm.item_list.unshift(item);
    }

    function openCalendar(status, $event, $index) {
      vm[status] = vm[status] || [];
      vm[status][$index] = vm[status][$index] || {};
      vm[status][$index].opened = true;
    }

    function updateTotalAmount(item) {
      if (item.med_batches_attributes[0].amount_per_pkg && item.med_batches_attributes[0].number_pkg) {
        item.med_batches_attributes[0].total_units = item.med_batches_attributes[0].amount_per_pkg * item.med_batches_attributes[0].number_pkg;
      }
    }

    function removeItem(item) {
      var idx = _.indexOf(vm.item_list, item);
      vm.item_list.splice(idx, 1);
    }

    function savePurchase() {
      var data = {
        receipt: {
          receipt_type: 'purchase',
          med_batches_attributes: []
        }
      };
      var ok = false;
      // Check whethere there are all required data
      _.each(vm.item_list, function(i){
        ok = pharmacare.validateMedBatch(i.med_batches_attributes[0], i.itemable.name);        
        if (ok) {
          data.receipt.med_batches_attributes.push(i.med_batches_attributes[0]);
        }      
      });
      // Save data
      if (ok){ 
        Receipt.save(data).$promise.then(function(resp){        
          toastr.success($filter('translate')('PURCHASE') + $filter('translate')('TOASTR_CREATED'), $filter('translate')('TOASTR_CONGRATS'));
          vm.item_list = [];
          vm.selected_med = '';
        }, function(error){
          toastr.error(error.data.errors, $filter('translate')('TOASTR_SORRY'));
        });
      }    
    }

  }