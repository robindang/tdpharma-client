'use strict';

angular.module('tdpharmaClientApp')
  .controller('ProductsIdCtrl', ProductsIdCtrl);

ProductsIdCtrl.$inject = ['$stateParams', '$window', 'APP_CONFIGURATION', 'Medicine'];

function ProductsIdCtrl($stateParams, $window, APP_CONFIGURATION, Medicine) {
  console.log($stateParams)
  var async = $window.async;

  var ctrl = this;
  ctrl.APP_CONFIGURATION = APP_CONFIGURATION;
  ctrl.isReadOnly = true;

  init();  

  function init() {
    async.waterfall([
        function(next) {
          Medicine.get($stateParams).$promise.then(function(medicine) {
            ctrl.medicine = medicine.data;
            next(null)
          });
        }
      ], function(err) {
        console.log(ctrl.medicine);
      });
  }
}
