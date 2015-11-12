(function () {
  'use strict';

  angular.module('tdpharmaClientApp')
      .config(angularTranslateConfig);

  angularTranslateConfig.$inject = ['$translateProvider'];

  function angularTranslateConfig($translateProvider) {
    $translateProvider.translations('vn', {
      GREETING: 'Allo, Allo!',
      LEADING_GREETING: 'Kích hoạt nhà thuốc của bạn với tdPharma',
      HOME: 'Home',
      INVENTORY: 'Tồn Kho',
      ORDERS: 'Hoá Đơn',
      CHECKOUT: 'Bán Thuốc',
      SIGNUP: 'Đăng Ký',
      LOGIN: 'Đăng Nhập',
      LOGOUT: 'Đăng xuất',
      PASSWORD_CHANGE_TITLE: 'Cập Nhập Mật Mã',
      CURRENT_PASSWORD: 'Mật Mã Hiện Tại',
      NEW_PASSWORD: 'Mật Mã Mới',
      PASSWORD_LENGTH_REQUIREMENT: 'Mật mã phải có ít nhất 8 ký tự',
      SAVE_CHANGES: 'Lưu Lại',
      TOASTR_CONGRATS: 'Chúc mừng!',
      TOASTR_SORRY: 'Sorry!',
      PASSWORD_CHANGE_SUCCESS: 'Mật mã của bạn đã cập nhật thành công',
      INCORRECT_PASSWORD: 'Mật mã hiện tại không đúng'
    });
  }

})();