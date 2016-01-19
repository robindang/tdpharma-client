'use strict';

angular.module('tdpharmaClientApp')
  .controller('CategoriesCtrl', CategoriesCtrl);

CategoriesCtrl.$inject = ['$location', '$scope', 'lodash', 'Category'];

function CategoriesCtrl($location, $scope, _, Category) {
  var ctrl = this;
  ctrl.activeCategory = null;

  init();

  function setActiveCategory(name, categories) {
    if (categories.length) ctrl.activeCategory = categories[0];
    _.forEach(categories, function(category) {
      if (category.name.toLowerCase() === name.toLowerCase()) {
        ctrl.activeCategory = category;
        return false;
      }
    });
  }

  function init() {
    initData();
    $scope.$on('hashchange', function($event, newHash) {
      setActiveCategory(newHash, ctrl.categories);
      $scope.$apply();
    })
  }

  function initData() {
    Category.get().$promise.then(function(categories) {
      ctrl.categories = categories.data;
      setActiveCategory($location.hash(), ctrl.categories);
    });
  }
};
