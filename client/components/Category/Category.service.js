'use strict';

angular.module('tdpharmaClientApp')
  .factory('Category', Category);

Category.$inject = ['$http', '$cookies'];

function Category($http, $cookies) {

  // Public API here
  return {
    get: get
  };

  function get() {

      
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