'use strict';

angular.module('tdpharmaClientApp')
  .directive('keydownEvents', keydownEvents);

keydownEvents.$inject = ['$document', '$rootScope'];

function keydownEvents($document, $rootScope) {
  return {
    restrict: 'A',
    link: function() {
      $document.bind('keydown', function(e) {
        console.log('Got keypress:', e.which);
        $rootScope.$broadcast('keydown', e);
        $rootScope.$broadcast('keydown:' + e.which, e);
      });
    }
  };
};