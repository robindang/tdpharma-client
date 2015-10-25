'use strict';

angular.module('tdpharmaClientApp')
  .factory('categoryFactory', categoryFactory);

categoryFactory.$inject = ['$http', '$cookies'];

function categoryFactory($http, $cookies) {

  // Public API here
  return {
    getCategories: getCategories
  };

  function getCategories() {

      
      return $http.get(
        'http://localhost:3000/api/v1/categories', 
        {
          params: {email: $cookies.get('email'), token: $cookies.get('token')}
        }
        ).then(getCategoriesComplete);
    
    function getCategoriesComplete(res) {
      return res.data.data;
    }
  }
}
