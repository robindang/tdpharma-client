'use strict';

angular.module('tdpharmaClientApp')
  .controller('CategoriesCtrl', CategoriesCtrl);

CategoriesCtrl.$inject = ['$location', 'lodash', 'Category'];

function CategoriesCtrl($location, _, Category) {
  var ctrl = this;
  ctrl.activeCategory = null;

  init();

  function init() {
    Category.get().$promise.then(function(categories) {
      ctrl.categories = categories.data;
      ctrl.activeCategory = ctrl.categories[0];
      var hash = $location.hash();
      _.forEach(ctrl.categories, function(category) {
        if (category.name.toLowerCase().replace(' ','') === hash) {
          ctrl.activeCategory = category;
          return false;
        }
      });
    });
  }
};
