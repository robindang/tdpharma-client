'use strict';

angular.module('tdpharmaClientApp')
  .controller('CategoriesItemCtrl', CategoriesItemCtrl);

CategoriesItemCtrl.$inject = ['$stateParams', 'APP_CONFIGURATION', 'DataHelper', 'InventorySearch']

function CategoriesItemCtrl($stateParams, APP_CONFIG, DataHelper, InventorySearch) {
  var ctrl = this;
  ctrl.APP_CONFIG = APP_CONFIG;

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
          categoryId = null;
          InventorySearch.getPage(0, 25, {categoryId:categoryId}).then(function(results) {
            ctrl.results = results;
            next(null)
          });
        }
      ], callback || function(){});
  }
}
