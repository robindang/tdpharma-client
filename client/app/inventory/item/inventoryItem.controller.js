'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryItemCtrl', InventoryItemCtrl);

InventoryItemCtrl.$inject = [
  '$location', '$stateParams', '$window', 'pharmacare', 'toastr', 
  'APP_CONFIGURATION', 'Auth', 'DataHelper', 'InventoryItem', 'User', 'Medicine'];

function InventoryItemCtrl($location, $stateParams, $window, pharmacare, toastr, APP_CONFIGURATION, Auth, DataHelper, InventoryItem, User, Medicine) {
  
  var async = $window.async;

  var ctrl = this;
  ctrl.store_users = [];
  ctrl.medicine = {};
  ctrl.APP_CONFIGURATION = APP_CONFIGURATION;
  ctrl.pharmacare = pharmacare;
  ctrl.barcodePrint = pharmacare.barcodePrint;
  ctrl.initBreadcrumbs = initBreadcrumbs;
  ctrl.updateTotalAmount = updateTotalAmount;
  ctrl.saveBatch = saveBatch;

  init();

  function init() {
    initData();        
  }

  function initData(callback) {
    async.waterfall([
        function(next) {
          InventoryItem.get($stateParams).$promise.then(function(item) {
            ctrl.item = item.data;
            next(null, ctrl.item.category_id);
          });
        },
        function(categoryId, next) {
          DataHelper.getBreadcrumbs(categoryId).then(function(breadcrumbs) {
            ctrl.breadcrumbs = breadcrumbs;
            next(null);
          });
        },
        function(next) {
          User.query().$promise.then(function(resp){
            ctrl.store_users = resp; 
            next(null);   
          }).catch(function(err){
            next(err.data.data.errors);            
          });
        },
        function(next) {
          User.get().$promise.then(function(user) {
            ctrl.edit_user = _.find(ctrl.store_users, function(u){return u.id === user.id});            
            next(null);
          }).catch(function(err){
            next(err.data.data.errors);
          });
        },
        function(next) {
          initMode();
          next(null);
        }
      ], callback || function(error){
        if (error)  {
          toastr.error(error, $filter('translate')('TOASTR_SORRY'));
        }        
      });
  }

  function updateTotalAmount() {
    if (ctrl.medicine.med_batches_attributes[0].amount_per_pkg && ctrl.medicine.med_batches_attributes[0].number_pkg) {
      ctrl.medicine.med_batches_attributes[0].total_units = ctrl.medicine.med_batches_attributes[0].amount_per_pkg * ctrl.medicine.med_batches_attributes[0].number_pkg;
    }
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

  function saveBatch() {
    if (ctrl.edit_user) {
      ctrl.medicine.med_batches_attributes[0].user_id = ctrl.edit_user.id;
    }
    var bOk = ctrl.pharmacare.validateMedBatch(ctrl.medicine.med_batches_attributes[0], ctrl.item.itemable.name);
    if (bOk) {
      Medicine.update({id: ctrl.item.itemable.id}, {medicine: ctrl.medicine}).$promise.then(function(resp){
        ctrl.item = resp.data;
        ctrl.medicine = {};
        ctrl.mode.setReadMode();
      }).catch(function(error){
        toastr.error(error.data.data.errors);
      });
    }
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
    };

    function __getter(mode) {return function() {return __mode===mode;};}
    function __setter(mode) {return function() {
      if (__mode === 'edit') {ctrl.item = angular.copy(__oldItem);}
      __mode = mode;
      if (__mode === 'edit') {__oldItem = angular.copy(ctrl.item);}
      if (__mode === 'add') {
        ctrl.medicine = {          
          med_batches_attributes: [
            { category_id: ctrl.item.category_id }
          ]          
        };        
      }
    };}
    function __save() {
      if (__mode !== 'edit') {return;}
      ctrl.item.sale_price_attributes = ctrl.item.sale_price;
      InventoryItem.update({id: ctrl.item.id}, {inventory_item: ctrl.item});
      __mode = 'read';
    }

  }
}
