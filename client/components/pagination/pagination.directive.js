'use strict';

angular.module('tdpharmaClientApp')
  .directive('pagination', function () {
    return {
      templateUrl: 'components/pagination/pagination.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });