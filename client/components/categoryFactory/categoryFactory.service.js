'use strict';

angular.module('tdpharmaClientApp')
  .factory('categoryFactory', categoryFactory);

categoryFactory.$inject = ['$http'];

function categoryFactory($http) {

  // Public API here
  return {
    getCategories: getCategories
  };

  function getCategories() {
      return $http.get('/assets/data/category.json')
            .then(getCategoriesComplete);
    
    function getCategoriesComplete(res) {
      return res.data;
    }
  }
}
