'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryCtrl', InventoryCtrl);

InventoryCtrl.$inject = ['lodash', 'pharmacare', 'toastr', 'InventorySearch', 'Medicine', 'APP_CONFIGURATION'];

function InventoryCtrl(_, pharmacare, toastr, InventorySearch, Medicine, APP_CONFIG) {

  var ctrl = this;
  ctrl.displayed = [];
  ctrl.raw = [];
  ctrl.store_medicines = [];      // Store medicines array for search drop down
  ctrl.status = 'active';
  ctrl.numberOfResults = '';
  ctrl.callServer = callServer;
  ctrl.pharmacare = pharmacare;
  ctrl.updateItemList = updateItemList;
  ctrl.searchMedicine = searchMedicine;

  searchMedicine(null, true);


  function updateItemList() {      
    if (ctrl.status == 'active') {
      ctrl.displayed = _.filter(ctrl.raw, function(i){return i.status == 'active'});
    } else if (ctrl.status == 'inactive') {
      ctrl.displayed = _.filter(ctrl.raw, function(i){return i.status == 'inactive'});
    } else {
      ctrl.displayed = ctrl.raw;
    }
  }

  function searchMedicine(search_string, force) {
    if ((search_string && search_string.length > 3) || force == true) {
      InventorySearch.getPage(0, 25, {q: search_string}).then(function(resp){
        ctrl.store_medicines = resp.data;
        console.log(resp.data)
      }).catch(function(error){
        toastr.error(error.data.data.errors);
      });
    }      
  }

  function callServer(tableState) {

    ctrl.isLoading = true;

    var pagination = tableState.pagination;

    var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10;  // Number of entries showed per page.

    InventorySearch.getPage(start, number, tableState).then(function (result) {
      ctrl.raw = result.data;        
      ctrl.numberOfResults = result.numberOfResults;
      //set the number of pages so the pagination can update
      tableState.pagination.numberOfPages = result.numberOfPages;
      ctrl.isLoading = false;
      updateItemList();
    });
  }
}