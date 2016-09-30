'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryCtrl', InventoryCtrl);

InventoryCtrl.$inject = ['lodash', 'pharmacare', 'toastr', '$state', 'InventoryItem', 'InventorySearch'];

function InventoryCtrl(_, pharmacare, toastr, $state, InventoryItem, InventorySearch) {

  var ctrl = this;
  ctrl.displayed = [];  
  ctrl.store_medicines = [];      // Store medicines array for search drop down
  ctrl.status = {
    clear: true,
    active: '',    
    no_price: false,
    no_inventory: false
  };
  ctrl.numberOfResults = '';
  ctrl.callServer = callServer;
  ctrl.pharmacare = pharmacare;
  ctrl.clearFilter = clearFilter;
  ctrl.updateItemList = updateItemList;
  ctrl.searchMedicine = searchMedicine;
  ctrl.gotoItem = gotoItem;
  ctrl.updatePrice = updatePrice;  
  ctrl.openItemPage = openItemPage;

  searchMedicine(null, true);

  function clearFilter() {
    ctrl.status.active = null;
    ctrl.status.no_price = false;
    ctrl.status.no_inventory = false;      
    ctrl.tableState.no_price = false;
    ctrl.tableState.no_inventory = false;
    ctrl.tableState.active = '';      
    callServer(ctrl.tableState);
  }

  function updateItemList() {
    if (ctrl.status.active === true || ctrl.status.active === false || ctrl.status.no_price || ctrl.status.no_inventory) {
      ctrl.status.clear = false;            
      ctrl.tableState.no_price = ctrl.status.no_price;
      ctrl.tableState.no_inventory = ctrl.status.no_inventory;
      ctrl.tableState.active = ctrl.status.active;
    }
    callServer(ctrl.tableState);
  }

  function gotoItem() {    
    $state.go('inventoryItem', {id: ctrl.selected_med.id});
  }  

  function searchMedicine(search_string, force) {
    if ((search_string && search_string.length > 3) || force === true) {
      InventorySearch.getPage(0, 25, {q: search_string}).then(function(resp){
        ctrl.store_medicines = resp;        
      }).catch(function(error){
        toastr.error(error.data.errors);
      });
    }      
  }    

  function openItemPage(item) {
    ctrl.isLoading = true;

    InventorySearch.getItemPage(ctrl.selected_med).then(function(result){
      ctrl.displayed = result.data;        
      ctrl.numberOfResults = result.numberOfResults;
      //set the number of pages so the pagination can update
      ctrl.tableState.pagination.numberOfPages = result.numberOfPages;
      ctrl.tableState.pagination.start = (result.current_page-1) * 25
      ctrl.isLoading = false;            
    }).catch(function(error){
      toastr.error(error.data.errors);
    });
  }

  function callServer(tableState) {

    ctrl.isLoading = true;

    var pagination = tableState.pagination;

    var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
    var number = pagination.number || 10;  // Number of entries showed per page.

    InventorySearch.getPage(start, number, tableState).then(function (result) {
      ctrl.displayed = result.data;        
      ctrl.numberOfResults = result.numberOfResults;
      //set the number of pages so the pagination can update
      tableState.pagination.numberOfPages = result.numberOfPages;
      ctrl.isLoading = false;
      ctrl.tableState = tableState;      
    });
  }


  function updatePrice(item) {
    item.edit_price_mode = false;
    var data = {
      inventory_item: {        
        sale_price_attributes: item.sale_price_attributes
      }
    };
    InventoryItem.update({id: item.id}, data).$promise.then(function(resp){
      item.sale_price = resp.sale_price;
    }, function(error){
      if (error.data && error.data.errors) {
          toastr.error(error.data.errors);
      }
    });
  }
}