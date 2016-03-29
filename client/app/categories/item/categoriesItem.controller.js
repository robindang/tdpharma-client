'use strict';

angular.module('tdpharmaClientApp')
  .controller('CategoriesItemCtrl', CategoriesItemCtrl);

CategoriesItemCtrl.$inject = ['$stateParams', 'DataHelper', 'InventorySearch'];

function CategoriesItemCtrl($stateParams, DataHelper, InventorySearch) {
  var ctrl = this;

  init();

  function init() {
    initData();
  }

  function initData(callback) {
    var categoryId = $stateParams.id;
    async.waterfall([
        function(next) {
          DataHelper.getBreadcrumbs(categoryId).then(function(breadcrumbs) {
            ctrl.breadcrumbs = breadcrumbs;
            next(null);
          });
        },
        function(next) {
          InventorySearch.getPage(0, 25, {categoryId:categoryId}).then(function(results) {
            ctrl.results = results;
            next(null);
          });
        }
      ], callback || function(){});
  }
}
