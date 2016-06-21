'use strict';

angular.module('tdpharmaClientApp')
  .controller('AdjustmentsCtrl', AdjustmentsCtrl);


AdjustmentsCtrl.$inject = ['Receipt', '$state', '$filter', 'OrderSearch'];

function AdjustmentsCtrl(Receipt, $state, $filter, OrderSearch) {	
	var ctrl = this;
	ctrl.getAdjustments = getAdjustments;
	ctrl.toPurchases = toPurchases;
	ctrl.toSales = toSales;

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

  function toPurchases() {
  	$state.go('listPurchases');
  }

  function toSales() {
  	$state.go('listSales');
  }

}