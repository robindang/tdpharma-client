'use strict';

angular.module('tdpharmaClientApp')
  .directive('keydownEvent', keydownEvent);

keydownEvent.$inject = ['$document', '$rootScope'];

function keydownEvent($document, $rootScope) {
  return {
    restrict: 'A',
    link: function() {
      $document.bind('keydown', function(e) {
        console.log('Got keypress:', e.which);
        $rootScope.$broadcast('keydown', e);
      });
    }
  };
};