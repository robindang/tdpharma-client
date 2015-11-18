'use strict';

angular.module('tdpharmaClientApp')
  .controller('ProductsCtrl', ProductsCtrl);

ProductsCtrl.$inject = ['$cookies', '$filter','Category', 'Medicine', 'User', 'toastr'];

function ProductsCtrl($cookies, $filter, Category, Medicine, User, toastr) {

  var ctrl = this;
  ctrl.tabs = [
    { title:'Category', template:'app/products/includes/category.html', active: true },
    { title:'Details', template:'app/products/includes/details.html', disabled: true }
  ];
  ctrl.categories = [];
  ctrl.medicine = {med_batches_attributes:[{}]};
  ctrl.maxDate = new Date();
  ctrl.selected_user = {};
  ctrl.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  ctrl.updateUser = updateUser;
  ctrl.open = open;
  ctrl.nextTab = nextTab;
  ctrl.save = save;

  prepareData();

  // Function definition
  function prepareData(){
    User.query().$promise.then(function(resp){
        ctrl.store_users = resp;
    }).catch(function(err){
      toastr.error(error.data.data.errors, $filter('translate')('TOASTR_SORRY'));
    });

    Category.get({}, function(x) {
      ctrl.categories = x.data;
    });
  }

  function updateUser(item){
    var resp = item;
    _.each(ctrl.medicine.med_batches_attributes, function(b){
      b.user_id = item.id;
    });
  }

  function nextTab() {
    var idx = ctrl.tabs.findIndex(function(x) {return x.active});
    var tab = ctrl.tabs[idx+1];
    tab.active = true;
    tab.disabled = false;
  }

  function save() {
    var params = {
      medicine: ctrl.medicine
    };
    if (ctrl.file) {
      params.image = ctrl.file.$ngfDataUrl;
    }
    Medicine.save({}, params).$promise.then(function(resp){
      // Reset form
      ctrl.medicine = {med_batches_attributes:[{user_id: ctrl.selected_user.id}]};      
      ctrl.file = null;
      _.extend(ctrl.tabs[0], {active: true, disabled: false});
      _.extend(ctrl.tabs[1], {active: false, disabled: true});
      toastr.success(resp.data.name + $filter('translate')('TOASTR_CREATED'), $filter('translate')('TOASTR_CONGRATS'))
    }).catch(function(error){
      toastr.error(error.data.data.errors, $filter('translate')('TOASTR_SORRY'));
    });
  }

  function open(status, $event, $index) {
    ctrl[status] = ctrl[status] || [];
    ctrl[status][$index] = ctrl[status][$index] || {};
    ctrl[status][$index].opened = true;
  };

}
