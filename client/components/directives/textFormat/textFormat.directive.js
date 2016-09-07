'use strict';

angular.module('tdpharmaClientApp')
  .directive('textFormat', ['$filter', function ($filter) {
    return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) return;

         ctrl.$formatters.unshift(function () {
           return $filter(attrs.format)(ctrl.$modelValue)
         });

         ctrl.$parsers.unshift(function (viewValue) {
           var plainNumber = viewValue.replace(/[\,\.]/g, '');
           var newVal = $filter('number')(plainNumber);
           elem.val(newVal);
           return plainNumber;
         });
       }
     };
  }]);