'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryCtrl', ['Resource', function (service) {

    var ctrl = this;

    this.displayed = [];
    this.numberOfResults = '';

    this.callServer = function callServer(tableState) {

      ctrl.isLoading = true;

      var pagination = tableState.pagination;

      var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      var number = pagination.number || 10;  // Number of entries showed per page.

      service.getPage(start, number, tableState).then(function (result) {
        ctrl.displayed = result.data;
        ctrl.numberOfResults = result.numberOfResults;
        tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
        ctrl.isLoading = false;
      });
    };

    this.getNumberOfRowsSelected = function() {
      return this.displayed.filter(function(x) {return x.isSelected}).length;
    }

  }]);