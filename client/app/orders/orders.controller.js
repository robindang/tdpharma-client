'use strict';

angular.module('tdpharmaClientApp')
  .controller('OrdersCtrl', OrdersCtrl);

OrdersCtrl.$inject = ['Transaction'];

function OrdersCtrl(Transaction) {

  var ctrl = this;

  ctrl.tabs = [
    { title:'Purchases', template:'app/orders/includes/purchases.html' },
    { title:'Sales', template:'app/orders/includes/sales.html' },
    { title:'History', template:'app/orders/includes/history.html' }
  ];

  Transaction.get().then(function(transactions) {
    console.log(transactions);
  });
}