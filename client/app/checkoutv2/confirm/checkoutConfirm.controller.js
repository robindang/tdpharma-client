'use strict';

angular.module('tdpharmaClientApp')
  .controller('CheckoutConfirmCtrl', CheckoutConfirmCtrl);

CheckoutConfirmCtrl.$inject = ['$scope', '$localStorage', 'InventoryItem'];

function CheckoutConfirmCtrl($scope, $localStorage, InventoryItem) {

  var emptyCart = {
    products: [],
    total: 0,
    total_tax: 0,
  };

  var ctrl = this;
  ctrl.totalPaid = 0;
  ctrl.cart = null;
  ctrl.printReceipt = printReceipt;

  init();

  function printReceipt(payment) {
    // print receipt
    var cart = angular.copy(ctrl.cart);
    cart.payment = angular.copy(payment);
    cart.date = new Date();

    // save to database
    Transactions.add(cart).then(function (res) {

      // clear cart and start fresh
      resetCart();
      
    });

    refreshInventory();
  }

  function onKeydown(event, e) {
    var s = String.fromCharCode(e.which);
    if (e.which === 13) {
      // checkout
      addProductToCart(ctrl.barcode);
      ctrl.barcode = '';
      return;
    }
    if (!/[\d\w]/.test(s)) return;
    ctrl.barcode = ctrl.barcode + s;
  }

  function init() {
    initEvents();
    initCart();
  }

  function initCart() {
    ctrl.cart = $localStorage.cart;
    if (!ctrl.cart) $location.path('/checkoutv2');
  }

  function initEvents() {
    $scope.$on('keydown', function() {
      var args = arguments;
      $scope.$apply(function() {
        onKeydown.apply(ctrl, args);  
      });
    });
  }
}
