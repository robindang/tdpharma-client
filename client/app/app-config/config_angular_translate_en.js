(function () {
  'use strict';

  angular.module('tdpharmaClientApp')
      .config(angularTranslateConfig);

  angularTranslateConfig.$inject = ['$translateProvider'];

  function angularTranslateConfig($translateProvider) {
    $translateProvider.translations('en', {
      GREETING: 'Allo, Allo!',
      LEADING_GREETING: 'Kick-start your pharmacy with tdPharma',
      HOME: 'Home',
      INVENTORY: 'Inventory',
      ORDERS: 'Orders',
      CHECKOUT: 'Checkout',
      SIGNUP: 'Sign up',
      LOGIN: 'Login',
      LOGOUT: 'Log out',
      PASSWORD_CHANGE_TITLE: 'Change password',
      CURRENT_PASSWORD: 'Current Password',
      NEW_PASSWORD: 'New Password',
      SAVE_CHANGES: 'Save Changes',
      PASSWORD_LENGTH_REQUIREMENT: 'Password must be at least 8 characters.',
      TOASTR_CONGRATS: 'Congratulation!',
      TOASTR_SORRY: 'Sorry!',
      PASSWORD_CHANGE_SUCCESS: 'Your password has been changed successfully',
      INCORRECT_PASSWORD: 'Incorrect Password'
    });
    $translateProvider.preferredLanguage('vn');
  }

})();
