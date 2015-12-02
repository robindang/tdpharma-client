'use strict';

angular.module('tdpharmaClientApp')
  .controller('InventoryCtrl', ['Resource', function (service) {

    var ctrl = this;

    ctrl.displayed = [];
    ctrl.raw = [];
    ctrl.status = '';
    ctrl.numberOfResults = '';
    ctrl.callServer = callServer;
    ctrl.getNumberOfRowsSelected = getNumberOfRowsSelected;
    ctrl.updateItemList = updateItemList;


    function updateItemList() {      
      if (ctrl.status == 'active') {
        ctrl.displayed = _.filter(ctrl.raw, function(i){return i.status == 'active'});
      } else if (ctrl.status == 'inactive') {
        ctrl.displayed = _.filter(ctrl.raw, function(i){return i.status == 'inactive'});
      } else {
        ctrl.displayed = ctrl.raw;
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
            m.photo_thumb.photo_link = m.photo_thumb.processed == true ? m.photo_thumb.photo : ('http://localhost:3000/' + m.photo_thumb.photo);
          }          
        });
        updateItemList();
      });
    };

    function getNumberOfRowsSelected() {
      return this.displayed.filter(function(x) {return x.isSelected}).length;
    }    

  }]);