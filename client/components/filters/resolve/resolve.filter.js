'use strict';

angular.module('tdpharmaClientApp')
  .filter('resolve', resolve);

resolve.$inject = ['APP_CONFIGURATION'];

function resolve(APP_CONFIG) {
    return function (input) {
      return APP_CONFIG.SERVER_DEFAULT_PICTURE_ENDPOINT+'/'+input;
    };
};
