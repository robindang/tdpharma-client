'use strict';

angular.module('tdpharmaClientApp')
  .controller('ProductsCtrl', ProductsCtrl);

ProductsCtrl.$inject = ['$cookies', '$filter', '$timeout', 'Category', 'Medicine', 'User', 'toastr', 'S3Upload', 'serverConfig', 'InventoryItem'];

function ProductsCtrl($cookies, $filter, $timeout, Category, Medicine, User, toastr, S3Upload, serverConfig, InventoryItem) {

  var ctrl = this;
  ctrl.tabs = [
    { title:'Category', template:'app/products/includes/category.html', active: true },
    { title:'Details', template:'app/products/includes/details.html', disabled: true }
  ];
  ctrl.categories = [];
  ctrl.amazon_config = {};
  ctrl.medicine = {med_batches_attributes:[{}]};
  ctrl.maxDate = new Date();
  ctrl.selected_user = {};
  ctrl.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  ctrl.loading = true;
  ctrl.updateUser = updateUser;
  ctrl.open = open;
  ctrl.nextTab = nextTab;
  ctrl.updateTotalAmount = updateTotalAmount;
  ctrl.uploadImage = uploadImage;
  ctrl.saveDirectUpload = saveDirectUpload;
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

    serverConfig.get({id: 'temp_amazon_s3'}).$promise.then(function(resp){
      ctrl.amazon_config = resp.data;
    }).catch(function(err){
      toastr.error(error.data.data.errors, $filter('translate')('TOASTR_SORRY'));
    })
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

  function updateTotalAmount() {
    if (ctrl.medicine.med_batches_attributes[0].amount_per_pkg && ctrl.medicine.med_batches_attributes[0].amount_unit) {
      ctrl.medicine.med_batches_attributes[0].total_units = ctrl.medicine.med_batches_attributes[0].amount_per_pkg * ctrl.medicine.med_batches_attributes[0].amount_unit;
    }
  }

  function uploadImage(){
    var direct_link;
    if (ctrl.file) {      
      var filename = moment().format('YYYYMMDDDDmmssssss');
      direct_link = S3Upload.upload(ctrl.amazon_config, ctrl.file, filename);      
    }
    return direct_link;
  }

  function finishSuccess(item){
    ctrl.medicine = {med_batches_attributes:[{user_id: ctrl.selected_user.id}]};      
    ctrl.file = null;
    _.extend(ctrl.tabs[0], {active: true, disabled: false});
    _.extend(ctrl.tabs[1], {active: false, disabled: true});              
    toastr.success(item.itemable.name + $filter('translate')('TOASTR_CREATED'), $filter('translate')('TOASTR_CONGRATS'));
  }

  function saveDirectUpload(){
    // First attach the category id into the medicine
    if (ctrl.selected[1]) {
      ctrl.medicine.med_batches_attributes[0].category_id = ctrl.selected[1].id;
    } else if (ctrl.selected[0]) {
      ctrl.medicine.med_batches_attributes[0].category_id = ctrl.selected[0].id;
    }
    // Validate form and save
    if (validateForm()) {
      ctrl.loading = false;
      var params = {
        medicine: ctrl.medicine
      };
      async.waterfall([
          function(callback) {
            // First process the image
            var filename = moment().format('YYYYMMDDDDmmssssss');
            S3Upload.upload(ctrl.amazon_config, ctrl.file, filename).then(function(resp){
              if (resp) {
                params.direct_upload_url = resp;
              }              
              return callback(null, params);
            }).catch(function(error){
              callback({error: error});
            })
          },
          function(arg1, callback) {
            // Save the medicines 
            Medicine.save({}, params).$promise.then(function(resp){              
              return callback(null, resp.data);
            }).catch(function(error){              
              callback({error: error.data.data.errors});
            });
          },
          function(arg1, callback) {
            // Wait until medicine image is ready
            var item = arg1;
            if (arg1.photo_thumb && !arg1.photo_thumb.processed) {                            
              async.whilst(
                function(){
                  return !item.photo_thumb.processed;
                },
                function(cb) {                  
                  toastr.info($filter('translate')('PROCESSING_IMAGE'));
                  InventoryItem.get({id: item.id}).$promise.then(function(resp){
                    item = resp.data;                    
                  }).catch(function(error){                                                                                  
                    return cb(error.data.data.errors);
                  })
                  $timeout(cb, 4000)
                },
                function(err) {
                  // Loop completed because of error    
                  if (err) {
                    return callback({error: err});                  
                  } else {
                    // Reset form          
                    finishSuccess(item);          
                    return callback(null, item);
                  }                               
                }
              );
            } else {
              // Reset form when there is no photo
              finishSuccess(item);              
              return callback(null, item);
            }            
          }          
        ], function (err, result){
        // After all processes are done or there is an error
        if (err) {
          toastr.error(err.error);
        }
        ctrl.loading = false;
      })
    }
  }

  function save() {
    // First attach the category id into the medicine
    if (ctrl.selected[1]) {
      ctrl.medicine.med_batches_attributes[0].category_id = ctrl.selected[1].id;
    } else if (ctrl.selected[0]) {
      ctrl.medicine.med_batches_attributes[0].category_id = ctrl.selected[0].id;
    }
    // Validate form and save
    if (validateForm()) {
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
  }

  function validateForm(){
    var ok_flag = true;
    if (!ctrl.medicine.med_batches_attributes[0].user_id) {
      toastr.error($filter('translate')('AUTHOR_REQUIRED'));
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.med_batches_attributes[0].category_id) {
      toastr.error($filter('translate')('CATEGORY_REQUIRED')); 
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.name) {
      toastr.error($filter('translate')('NAME_REQUIRED')); 
      ok_flag = false;
    }
    if ( ok_flag && !ctrl.medicine.concentration) {
     toastr.error($filter('translate')('CONCENTRATION_REQUIRED'));  
     ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.concentration_unit) {
      toastr.error($filter('translate')('CONCENTRATION_UNIT_REQUIRED')); 
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.mfg_location) {
      toastr.error($filter('translate')('MFG_LOCATION_REQUIRED'));  
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.med_batches_attributes[0].mfg_date){
      toastr.error($filter('translate')('MFG_DATE_REQUIRED')); 
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.med_batches_attributes[0].expire_date) {
      toastr.error($filter('translate')('EXPIRE_DATE_REQUIRED')); 
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.med_batches_attributes[0].package){
      toastr.error($filter('translate')('PACKAGE_REQUIRED')); 
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.med_batches_attributes[0].amount_per_pkg) {
      toastr.error($filter('translate')('AMOUNT_PER_PKG_REQUIRED')); 
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.med_batches_attributes[0].amount_unit) {
      toastr.error($filter('translate')('AMOUNT_UNIT_REQUIRED'));
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.med_batches_attributes[0].total_units) {
      toastr.error($filter('translate')('TOTAL_UNITS_REQUIRED')); 
      ok_flag = false;
    }
    if (ok_flag && !ctrl.medicine.med_batches_attributes[0].total_price) {
      toastr.error($filter('translate')('PRICE_REQUIRED')); 
      ok_flag = false;
    }
    return ok_flag;
  }

  function open(status, $event, $index) {
    ctrl[status] = ctrl[status] || [];
    ctrl[status][$index] = ctrl[status][$index] || {};
    ctrl[status][$index].opened = true;
  };

}
