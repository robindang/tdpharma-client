'use strict';

angular.module('tdpharmaClientApp')
  .controller('ProductsIdCtrl', ProductsIdCtrl);

ProductsIdCtrl.$inject = [];

function ProductsIdCtrl() {
  ctrl = this;
  ctrl.isReadOnly = true;
}
