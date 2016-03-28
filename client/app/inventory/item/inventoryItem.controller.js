'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryItemCtrl', InventoryItemCtrl);

InventoryItemCtrl.$inject = [
  '$location', '$stateParams', '$window', 'pharmacare', 'toastr', 
  'APP_CONFIGURATION', 'Auth', 'DataHelper', 'InventoryItem', 'Receipt'];

function InventoryItemCtrl($location, $stateParams, $window, pharmacare, toastr, APP_CONFIGURATION, Auth, DataHelper, InventoryItem, Receipt) {
  
  var async = $window.async;

  var ctrl = this;
  ctrl.APP_CONFIGURATION = APP_CONFIGURATION;
  ctrl.pharmacare = pharmacare;
  ctrl.print = print;

  init();

  function init() {
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
        },
        function(next) {
          initMode();
          next(null);
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

  function print(batch) {
    var divID = 'code-' + batch.id;
    var printContents = document.getElementById(divID);
    var popupWin = window.open('', '_blank');
    popupWin.document.open();
    popupWin.document.write("<html><head></head><body onload=\"window.print()\"><img src=\"" + printContents.src + "\"/></body></html>");
    popupWin.document.close();
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
      __mode = 'read';
    }

  }
}
