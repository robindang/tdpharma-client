'use strict';

angular.module('tdpharmaClientApp')
  .controller('OrdersCtrl', OrdersCtrl);

OrdersCtrl.$inject = ['Receipt'];

function OrdersCtrl(Receipt) {

  var ctrl = this;
  ctrl.getTotal = getTotal;

  ctrl.tabs = [
    { title:'Purchases', template:'app/orders/includes/purchases.html' },
    { title:'Sales', template:'app/orders/includes/sales.html' },
    { title:'History', template:'app/orders/includes/history.html' }
  ];

  init();

  function getTotal(receipt) {
    if (receipt.receipt_type === 'purchase') return -receipt.total;
    return receipt.total;
  }

  function init() {
    Receipt.get({purchase: true}).$promise.then(function(res) {
      ctrl.purchases = res.data;
    });
    Receipt.get({sale: true}).$promise.then(function(res) {
      ctrl.sales = res.data;
    });
    Receipt.get().$promise.then(function(res) {
      ctrl.history = res.data;
    });
  }
}