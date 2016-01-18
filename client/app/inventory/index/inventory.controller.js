'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryCtrl', InventoryCtrl);

InventoryCtrl.$inject = ['Resource', 'lodash', 'pharmacare', 'toastr', 'Medicine', 'APP_CONFIGURATION'];

function InventoryCtrl(service, _, pharmacare, toastr, Medicine, APP_CONFIGURATION) {

  var ctrl = this;

  ctrl.displayed = [];
  ctrl.raw = [];
  ctrl.store_medicines = [];      // Store medicines array for search drop down
  ctrl.status = 'active';
  ctrl.numberOfResults = '';
  ctrl.callServer = callServer;
  ctrl.getNumberOfRowsSelected = getNumberOfRowsSelected;
  ctrl.pharmacare = pharmacare;
  ctrl.updateItemList = updateItemList;
  ctrl.searchMedicine = searchMedicine;
  ctrl.selectAllRows = selectAllRows;

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
      Medicine.get({search: search_string}).$promise.then(function(resp){
        ctrl.store_medicines = resp.data;
        _.each(ctrl.store_medicines, function(m){
          if (m.store_thumb) {
            // Display store image first if there is one
            m.photo_thumb.photo_link = m.store_thumb.processed == true ? m.store_thumb.photo : (APP_CONFIGURATION.SERVER_DEFAULT_PICTURE_ENDPOINT + m.store_thumb.photo);
          }
          else if (m.photo_thumb) {
            m.photo_thumb.photo_link = m.photo_thumb.processed == true ? m.photo_thumb.photo : (APP_CONFIGURATION.SERVER_DEFAULT_PICTURE_ENDPOINT + m.photo_thumb.photo);
          }
        });
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

    service.getPage(start, number, tableState).then(function (result) {
      ctrl.raw = result.data;        
      ctrl.numberOfResults = result.numberOfResults * ctrl.raw.length;
      //set the number of pages so the pagination can update
      tableState.pagination.numberOfPages = result.numberOfResults;
      ctrl.isLoading = false;        
      _.each(ctrl.raw, function(m){
        m.updated_moment = moment(m.updated_at);
        if (m.photo_thumb) {
          m.photo_thumb.photo_link = m.photo_thumb.processed == true ? m.photo_thumb.photo : (APP_CONFIGURATION.SERVER_DEFAULT_PICTURE_ENDPOINT + m.photo_thumb.photo);
        }          
      });
      updateItemList();
    });
  };

  function getNumberOfRowsSelected() {
    return ctrl.displayed.filter(function(x) {return x.isSelected}).length;
  }

  function selectAllRows($event) {
    var newValue = $event.target.checked ? true:false;
    _.each(ctrl.displayed, function(row) {
      row.isSelected = newValue;
    })
  }
}