'use strict';

angular.module('tdpharmaClientApp')
  .controller('OrdersCtrl', OrdersCtrl);

OrdersCtrl.$inject = ['Receipt', '$state', '$filter', 'OrderSearch'];

function OrdersCtrl(Receipt, $state, $filter, OrderSearch) {

  var ctrl = this;  
  ctrl.toNewPurchase = toNewPurchase;
  ctrl.toOrder = toOrder;
  ctrl.getPurchases = getPurchases;
  ctrl.getSales = getSales;
  ctrl.getAdjustments = getAdjustments;

  ctrl.tabs = [
    { title: $filter('translate')('PURCHASES_RECEIPT'), template:'app/orders/includes/purchases.html', active: 'active' },
    { title: $filter('translate')('SALES_RECEIPT'), template:'app/orders/includes/sales.html' },
    { title: $filter('translate')('ADJUSTMENTS_RECEIPT'), template:'app/orders/includes/adjustment.html' }
  ];

  function getPurchases(tableState) {
    ctrl.is_loading_purchases = false;
    var pagination = tableState.pagination;
    var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10;  // Number of entries showed per page.
    tableState.purchase = true;

    OrderSearch.getPage(start, number, tableState).then(function (result) {
      ctrl.purchases = result.data;              
      //set the number of pages so the pagination can update
      tableState.pagination.numberOfPages = result.numberOfPages;
      ctrl.is_loading_purchases = true;
    });
  }

  function getSales(tableState) {
    ctrl.is_loading_sales = false;
    var pagination = tableState.pagination;
    var start = pagination.start || 0;  // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10; // Number of entries showed per page.
    tableState.sale = true;
    OrderSearch.getPage(start, number, tableState).then(function(result){
      ctrl.sales = result.data;
      //set the number of pages so the pagination can update
      tableState.pagination.numberOfPages = result.numberOfPages;
      ctrl.is_loading_sales = true;
    });
  }

  function getAdjustments(tableState) {
    ctrl.is_loading_adjustments = false;
    var pagination = tableState.pagination;
    var start = pagination.start || 0;  // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10; // Number of entries showed per page.
    tableState.adjustment = true;
    OrderSearch.getPage(start, number, tableState).then(function(result){
      ctrl.sales = result.data;
      //set the number of pages so the pagination can update
      tableState.pagination.numberOfPages = result.numberOfPages;
      ctrl.is_loading_adjustments = true;
    });
  }

  function toNewPurchase() {
    $state.go('newPurchases');
  }

  function toOrder(order){
    $state.go('orderItem', {id: order.id});
  }
}