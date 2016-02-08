'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryItemCtrl', InventoryItemCtrl);

InventoryItemCtrl.$inject = [
  '$location', '$stateParams', '$window', 'pharmacare', 'toastr', 
  'APP_CONFIGURATION', 'Auth', 'DataHelper', 'InventoryItem', 'Receipt'];

function InventoryItemCtrl($location, $stateParams, $window, pharmacare, toastr, APP_CONFIGURATION, Auth, DataHelper, InventoryItem, Receipt) {
  console.log($stateParams)
  var async = $window.async;

  var ctrl = this;
  ctrl.APP_CONFIGURATION = APP_CONFIGURATION;
  ctrl.pharmacare = pharmacare

  init();

  function init() {
    initMode();
    initData();
  }

  function initData(callback) {
    async.waterfall([
        function(next) {
          InventoryItem.get($stateParams).$promise.then(function(item) {
            ctrl.item = item.data;
            next(null, ctrl.item.category_id)
          })    
        },
        function(categoryId, next) {
          DataHelper.getBreadcrumbs(categoryId).then(function(breadcrumbs) {
            ctrl.breadcrumbs = breadcrumbs;
            next(null);
          });
        }
      ], callback || function(){});
  }

  function initBreadcrumbs(categoryId) {
    var breadcrumbs = [];
    while (categoryId !== null) {
      var category = ctrl.categories[categoryId];
      breadcrumbs.unshift(category);
      categoryId = category.parent_id;
    }
    ctrl.breadcrumbs = breadcrumbs;
  }

  function initMode() {
    var hash = $location.hash();
    var __mode = (hash==='add'||hash==='edit') ? hash:'read';
    var __oldItem = angular.copy(ctrl.item);

    ctrl.mode = {
      isAddMode: __getter('add'),
      isEditMode: __getter('edit'),
      isReadMode: __getter('read'),
      save: __save,
      setAddMode: __setter('add'),
      setEditMode: __setter('edit'),
      setReadMode: __setter('read')
    }

    function __getter(mode) {return function() {return __mode===mode}}
    function __setter(mode) {return function() {
      if (__mode == 'edit') ctrl.item = angular.copy(__oldItem);
      __mode = mode;
      if (__mode == 'edit') __oldItem = angular.copy(ctrl.item);
    }}
    function __save() {
      if (__mode != 'edit') return;
      ctrl.item.sale_price_attributes = ctrl.item.sale_price;
      InventoryItem.update({id: ctrl.item.id}, {inventory_item: ctrl.item});
      updateBatchAmounts(ctrl.item.available_batches);
      __mode = 'read';
    }

    function updateBatchAmounts(batches) {
      var now = moment();
      var o = {
        receipt: {
          receipt_type: 'adjustment',
          transactions_attributes: _.map(batches, function(item) {
            return {
              delivery_time: now,
              due_date: now,
              new_total: item.total_units,
              med_batch_id: item.id,
              sale_user_id: Auth.getCurrentUser().id
            }
          })
        }      
      };
      Receipt.save({}, o).$promise.then(function(res) {}, function(res) {
        if (res.data && res.data.data && res.data.data.errors)
          toastr.error(res.data.data.errors);
        __mode = 'edit';
      });
    }
  }
}
