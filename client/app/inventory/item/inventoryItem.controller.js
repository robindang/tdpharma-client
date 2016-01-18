'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryItemCtrl', InventoryItemCtrl);

InventoryItemCtrl.$inject = [
  '$stateParams', '$window', 'pharmacare', 'APP_CONFIGURATION', 'Category', 'InventoryItem'];

function InventoryItemCtrl($stateParams, $window, pharmacare, APP_CONFIGURATION, Category, InventoryItem) {
  console.log($stateParams)
  var async = $window.async;

  var ctrl = this;
  ctrl.APP_CONFIGURATION = APP_CONFIGURATION;
  ctrl.pharmacare = pharmacare

  init();

  function init() {
    initMode();
    initData(function(err) {
      if (err) return;
      initBreadcrumbs(ctrl.item.category_id);
    });
  }

  function initData(callback) {
    async.waterfall([
        function(next) {
          Category.get().$promise.then(function(categories) {
            var d = categories.data;
            var cache = {};
            while (d.length) {
              var o = d.pop();
              if (o.id in cache) continue;
              cache[o.id] = o;
              d = d.concat(o.children);
            }
            ctrl.categories = cache;
            next(null);
          });
        },
        function(next) {
          InventoryItem.get($stateParams).$promise.then(function(item) {
            ctrl.item = item.data;
            next(null)
          })    
        }
      ], callback);
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
    var __mode = 'read';
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
