'use strict';

angular.module('tdpharmaClientApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('categories', {
        url: '/categories',
        templateUrl: 'app/categories/index/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'cc'
      })
      .state('categoriesItem', {
        url: '/categories/:id',
        templateUrl: 'app/categories/item/categoriesItem.html',
        controller: 'CategoriesItemCtrl',
        controllerAs: 'cic'
      });
  });