'use strict';

angular.module('tdpharmaClientApp')
  .controller('Checkoutv2Ctrl', Checkoutv2Ctrl);

Checkoutv2Ctrl.$inject = ['$scope'];

function Checkoutv2Ctrl($scope) {

  var ctrl = this;
  ctrl.barcode = '';

  init();

  function init() {
    $scope.$on('keydown', function(event, e) {
      $scope.$apply(function() {
        var s = String.fromCharCode(e.which);
        if (e.which === 13) return ctrl.barcode = '';
        if (!/[\d\w]/.test(s)) return;
        ctrl.barcode = ctrl.barcode + s;
      });
    })
  }
}
