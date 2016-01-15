'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryItemCtrl', InventoryItemCtrl);

InventoryItemCtrl.$inject = ['$stateParams', '$window', 'APP_CONFIGURATION', 'Category', 'InventoryItem'];

function InventoryItemCtrl($stateParams, $window, APP_CONFIGURATION, Category, InventoryItem) {
  console.log($stateParams)
  var async = $window.async;

  var ctrl = this;
  ctrl.APP_CONFIGURATION = APP_CONFIGURATION;
  ctrl.isReadOnly = true;
  ctrl.getStatus = getStatus

  init();  

  function init() {
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
      ], function(err) {
        console.log(ctrl.categories); console.log(ctrl.item);
        var categoryId = ctrl.item.category_id;
        if (categoryId === null) return;
        var category = ctrl.categories[categoryId];
        var breadcrumbs = [category];
        while (category.parent_id !== null) {
          category = ctrl.categories[category.parent_id];
          breadcrumbs.unshift(category);
        }
        ctrl.breadcrumbs = breadcrumbs;
      });
  }

  function getStatus() {
    if (!ctrl.item) return '';
    if (ctrl.item.status === 'inactive') return 'Off Sale';
    if (ctrl.item.status === 'active') return ctrl.item.amount ? 'On Sale':'Out of Stock';
    return ctrl.item.status;
  }
}
