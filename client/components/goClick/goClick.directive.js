'use strict';

angular.module('tdpharmaClientApp')
  .directive('goClick', function ($location) {
    return {
      link: function (scope, element, attrs) {
        var path;

        attrs.$observe( 'goClick', function (val) {
          path = val;
        });

        element.bind( 'click', function () {
          scope.$apply( function () {
            $location.path( path );
          });
        });
      }
    };
  });