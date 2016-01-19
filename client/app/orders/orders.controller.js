'use strict';

angular.module('tdpharmaClientApp')
  .controller('OrdersCtrl', OrdersCtrl);

OrdersCtrl.$inject = ['Receipt'];

function OrdersCtrl(Receipt) {

  var ctrl = this;

  ctrl.tabs = [
    { title:'Purchases', template:'app/orders/includes/purchases.html' },
    { title:'Sales', template:'app/orders/includes/sales.html' },
    { title:'History', template:'app/orders/includes/history.html' }
  ];

  Receipt.get({purchase: true}).$promise.then(function(res) {
    ctrl.purchases = res.data;
  });
}