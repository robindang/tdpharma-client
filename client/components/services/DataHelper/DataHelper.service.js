'use strict';

angular.module('tdpharmaClientApp')
  .factory('DataHelper', DataHelper);

DataHelper.$inject = ['$q', 'Category'];

function DataHelper($q, Category) {
  // Service logic
  // ...

  var meaningOfLife = 42;

  // Public API here
  return {
    getBreadcrumbs: function(categoryId) {
      var deferred = $q.defer();

      this.getCategories().then(function(categories) {
        var result = [];
        while (categoryId !== null) {
          var category = categories[categoryId];
          result.unshift(category);
          categoryId = category.parent_id;
        }
        deferred.resolve(result);
      });
      
      return deferred.promise;
    },
    getCategories: function () {
      var deferred = $q.defer();

      Category.get().$promise.then(function(categories) {
        var data = categories.data;
        var result = {};
          while (data.length) {
            var o = data.pop();
            if (o.id in result) continue;
            result[o.id] = o;
            data = data.concat(o.children);
          }
          deferred.resolve(result);
        });

      return deferred.promise;
    }
  };
}
