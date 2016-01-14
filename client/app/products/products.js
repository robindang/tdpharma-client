'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/products',
        templateUrl: 'app/products/index/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'pc'
      })
      .state('productsId', {
        url: '/products/:id',
        templateUrl: 'app/products/id/productsId.html',
        controller: 'ProductsIdCtrl',
        controllerAs: 'pic'
      });
  });