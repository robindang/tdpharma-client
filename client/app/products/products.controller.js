'use strict';

angular.module('tdpharmaClientApp')
  .controller('ProductsCtrl', ProductsCtrl);

ProductsCtrl.$inject = ['Category'];

function ProductsCtrl(Category) {

  var ctrl = this;

  ctrl.tabs = [
    { title:'Category', template:'app/products/includes/category.html' },
    { title:'Details', template:'app/products/includes/details.html', disabled: true }
  ];

  ctrl.nextTab = function() {
    var tab = ctrl.tabs[1];
    tab.active = true;
    tab.disabled = false;
  }

  Category.get().then(function(x) {
    ctrl.categories = x;
  });
}
