'use strict';

angular.module('tdpharmaClientApp')
  .directive('hashchangeEvent', hashchangeEvent);

hashchangeEvent.$inject = ['$location', '$rootScope', '$window'];

function hashchangeEvent($location, $rootScope, $window) {
  var oldHash = $location.hash();
  return {
    restrict: 'A',
    link: function() {
      $window.onhashchange = function(e) {
        var newHash = $location.hash();
        $rootScope.$broadcast('hashchange', newHash, oldHash);
        oldHash = newHash;
      };
    }
  };
}