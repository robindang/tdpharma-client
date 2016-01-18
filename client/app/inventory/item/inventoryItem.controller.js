'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryItemCtrl', InventoryItemCtrl);

InventoryItemCtrl.$inject = [
  '$location', '$stateParams', '$window', 'pharmacare', 'APP_CONFIGURATION', 
  'DataHelper', 'InventoryItem'];

function InventoryItemCtrl($location, $stateParams, $window, pharmacare, APP_CONFIGURATION, DataHelper, InventoryItem) {
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
    var __getter = function(mode) {return function() {return __mode===mode}};
    var __setter = function(mode) {return function() {__mode = mode}};
    ctrl.mode = {
      isAddMode: __getter('add'),
      isEditMode: __getter('edit'),
      isReadMode: __getter('read'),
      setAddMode: __setter('add'),
      setEditMode: __setter('edit'),
      setReadMode: __setter('read')
    }
  }
}
