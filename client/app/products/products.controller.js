'use strict';

angular.module('tdpharmaClientApp')
  .controller('ProductsCtrl', ProductsCtrl);

ProductsCtrl.$inject = ['$cookies', 'Category', 'Medicine'];

function ProductsCtrl($cookies, Category, Medicine) {

  var ctrl = this;

  ctrl.tabs = [
    { title:'Category', template:'app/products/includes/category.html', active: true },
    { title:'Details', template:'app/products/includes/details.html', disabled: true }
  ];

  ctrl.nextTab = function() {
    var idx = ctrl.tabs.findIndex(function(x) {return x.active});
    var tab = ctrl.tabs[idx+1];
    tab.active = true;
    tab.disabled = false;
  }

  ctrl.save = function() {
    Medicine.save({}, {
      medicine: ctrl.medicine
    });
  }

  Category.get({}, function(x) {
    ctrl.categories = x.data;
  });
}
