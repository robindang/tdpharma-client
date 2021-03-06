'use strict';

angular.module('tdpharmaClientApp')
  .factory('DataHelper', DataHelper);

DataHelper.$inject = ['$q', 'Category'];

function DataHelper($q, Category) {
  // Service logic
  // ...  

  // Public API here
  return {
    getBreadcrumbs: function(categoryId) {
      var deferred = $q.defer();

      this.getCategories().then(function(categories) {
        var result = [];
        while (categoryId !== null) {
          var category = categories[categoryId];
          category.link = result.length ? ('/categories#'+category.name):('/categories/'+category.id);
          result.unshift(category);
          categoryId = category.parent_id;
        }
        deferred.resolve(result);
      });
      
      return deferred.promise;
    },
    getCategories: function () {
      var deferred = $q.defer();

      Category.query().$promise.then(function(categories) {
        var data = categories;
        var result = {};
          while (data.length) {
            var o = data.pop();
            if (o.id in result) {continue;}
            result[o.id] = o;
            data = data.concat(o.children);
          }
          deferred.resolve(result);
        });

      return deferred.promise;
    }
  };
}
