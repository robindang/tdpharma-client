'use strict';

angular.module('tdpharmaClientApp')
  .controller('ProductsCtrl', ProductsCtrl);

ProductsCtrl.$inject = ['categoryFactory'];

function ProductsCtrl(categoryFactory) {

  var ctrl = this;

  categoryFactory.getCategories().then(function(x) {
    ctrl.categoryMap = x;
    ctrl.categories = Object.keys(x);
  });
}
