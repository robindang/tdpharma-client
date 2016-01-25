'use strict';

angular.module('tdpharmaClientApp')
  .controller('CheckoutConfirmCtrl', CheckoutConfirmCtrl);

CheckoutConfirmCtrl.$inject = ['$scope', '$localStorage', '$location', 'lodash', 'InventoryItem', 'Receipt'];

function CheckoutConfirmCtrl($scope, $localStorage, $location, _, InventoryItem, Receipt) {

  var ctrl = this;
  ctrl.totalPaid = 0;
  ctrl.cart = null;
  ctrl.calcChangeDue = calcChangeDue;
  ctrl.checkout = checkout;
  ctrl.printReceipt = printReceipt;

  init();

  function checkout(cart) {
    var o = {
      receipt_type: 'sale',
      total: cart.total,
      transactions_attributes: _.map(cart.products, function(item) {
        return {
          amount: item.quantity,
          med_batch_id: item.id,
          total_price: item.quantity * item.sale_price.amount
        }
      })
    };
    Receipt.save({}, o).$promise.then(function(receipt) {
      console.log(receipt);
    });
  }

  function calcChangeDue(totalPaid, totalDue) {
    return Math.max(0, totalPaid - totalDue);
  }

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
    if (e.which === 27) {
      ctrl.totalPaid = 0;
    }
    if (e.which === 8) {
      e.preventDefault();
      ctrl.totalPaid = Math.floor(ctrl.totalPaid / 10);
      return;
    }
    if (e.which === 13) {
      // checkout
      return;
    }
    if (e.which === 9) {
      e.preventDefault();
      if (e.shiftKey) $location.path('/checkoutv2');
      return;
    }
    if (e.which == 37) {
      $location.path('/checkoutv2');
      return
    }
    if (!/\d/.test(s)) return;
    ctrl.totalPaid = ctrl.totalPaid * 10 + parseInt(s);
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
