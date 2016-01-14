'use strict';

angular.module('tdpharmaClientApp')
  .controller('ProductsIdCtrl', ProductsIdCtrl);

ProductsIdCtrl.$inject = ['$stateParams', '$window', 'Category', 'InventoryItem'];

function ProductsIdCtrl($stateParams, $window, Category, InventoryItem) {
  console.log($stateParams)
  var async = $window.async;

  var ctrl = this;
  ctrl.isReadOnly = true;

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
}
