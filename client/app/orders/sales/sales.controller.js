'use strict';

angular.module('tdpharmaClientApp')
  .controller('SalesCtrl', SalesCtrl);


SalesCtrl.$inject = ['Receipt', '$state', '$filter', 'OrderSearch'];

function SalesCtrl(Receipt, $state, $filter, OrderSearch) {	
	var ctrl = this;
	ctrl.getSales = getSales;
	ctrl.toPurchases = toPurchases;
	ctrl.toAdjustments = toAdjustments;
  ctrl.toOrder = toOrder;

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

  function toOrder(order){
    $state.go('orderItem', {id: order.id});
  }

  function toPurchases() {
  	$state.go('listPurchases');
  }

  function toAdjustments() {
  	$state.go('listAdjustments');
  }

}