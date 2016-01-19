'use strict';

angular.module('tdpharmaClientApp')
  .controller('Checkoutv2Ctrl', Checkoutv2Ctrl);

Checkoutv2Ctrl.$inject = ['$scope', '$localStorage', 'InventoryItem'];

function Checkoutv2Ctrl($scope, $localStorage, InventoryItem) {

  var emptyCart = {
    products: [],
    total: 0,
    total_tax: 0,
  };

  var ctrl = this;
  ctrl.barcode = '';
  ctrl.cart = $localStorage.cart || angular.copy(emptyCart)
  ctrl.addManualItem = addManualItem;
  ctrl.addQuantity = addQuantity;
  ctrl.printReceipt = printReceipt;
  ctrl.removeProductFromCart = removeProductFromCart;
  ctrl.removeQuantity = removeQuantity;
  ctrl.updateCartTotals = updateCartTotals;

  init();

  function resetCart() {
      delete $localStorage.cart;
      ctrl.cart = angular.copy(emptyCart);
      updateCartTotals();
  }
  
  function addProductAndUpdateCart(product) {
    ctrl.cart.products = ctrl.cart.products.concat([product]);
    updateCartTotals();
    ctrl.barcode = '';
  }

  function productAlreadyInCart(barcode) {
    var product = _.find(ctrl.cart.products, function(x) { return x.id.toString() === barcode; });
    
    if (product) {
      product.quantity = product.quantity + 1;
      updateCartTotals();
    }

    return product;
  }

  function addProductToCart(barcode) {
    if (!barcode) return;
    if (productAlreadyInCart(barcode)) return;
    
    InventoryItem.get({id: barcode}).$promise.then(function(product) {
      product = angular.copy(product.data);
      product.quantity = 1;
      addProductAndUpdateCart(product);
    });
  }

  function addManualItem(product) {
    product.quantity = 1;
    addProductAndUpdateCart(product);
  }

  function removeProductFromCart(index) {
    ctrl.cart.products.splice(index,1);
    updateCartTotals();
  }

  function updateCartInLocalStorage() {
    $localStorage.cart = ctrl.cart;
  }

  function updateCartTotals() {
    ctrl.cart.total = _.reduce(ctrl.cart.products, function (total, product) {
      var weightedPrice = parseFloat( product.price * product.quantity );
      var weightedTax = parseFloat( weightedPrice * product.taxPercent );
      var weightedPricePlusTax = weightedPrice + weightedTax;
      return total + weightedPricePlusTax;
    }, 0);

    ctrl.cart.total_tax = _.reduce(ctrl.cart.products, function (total, product) {
      var weightedPrice = parseFloat( product.price * product.quantity );
      var weightedTax = parseFloat( weightedPrice * product.taxPercent );
      return total + weightedTax;
    }, 0);

    updateCartInLocalStorage();
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

  function addQuantity(product) {
    product.quantity = parseInt(product.quantity) + 1;
    updateCartTotals();
  }

  function removeQuantity(product) {
    if (parseInt(product.quantity) > 1) {
      product.quantity = parseInt(product.quantity) - 1;
      updateCartTotals();
    } 
  }

  function onKeydown(event, e) {
    var s = String.fromCharCode(e.which);
    if (e.which === 27) {
      resetCart();
      return;
    }
    if (e.which === 8) {
      e.preventDefault();
      ctrl.barcode = ctrl.barcode.substring(0, ctrl.barcode.length-1);
      return;
    }
    if (e.which === 13) {
      addProductToCart(ctrl.barcode);
      ctrl.barcode = '';
      return;
    }
    if (!/[\d\w]/.test(s)) return;
    ctrl.barcode = ctrl.barcode + s;
  }

  function init() {
    initEvents();
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
