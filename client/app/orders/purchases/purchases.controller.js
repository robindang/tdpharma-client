'use strict';

angular.module('tdpharmaClientApp')
  .controller('PurchasesCtrl', PurchasesCtrl);


PurchasesCtrl.$inject = ['Receipt', '$state', '$filter', 'OrderSearch'];

function PurchasesCtrl(Receipt, $state, $filter, OrderSearch) {	
	var ctrl = this;

	ctrl.getPurchases = getPurchases;
  ctrl.toNewPurchase = toNewPurchase;
  ctrl.toOrder = toOrder;
  ctrl.toSales = toSales;
  ctrl.toAdjustments = toAdjustments;

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

  function toNewPurchase() {
    $state.go('newPurchases');
  }

  function toOrder(order){
    $state.go('orderItem', {id: order.id});
  }

  function toSales() {
  	$state.go('listSales');
  }

  function toAdjustments() {
  	$state.go('listAdjustments');
  }
}