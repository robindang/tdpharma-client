(function() {
  'use strict';

  angular
      .module('tdpharmaClientApp')
      .constant('toastr', toastr)
      .config(toastrConfig);

  toastrConfig.$inject = ['toastr'];

  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.closeButton = true;
    toastr.options.positionClass = 'toast-custom-top-right';
  }


})();
