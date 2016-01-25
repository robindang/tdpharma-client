'use strict';

angular.module('tdpharmaClientApp')
  .filter('resolve', resolve);

resolve.$inject = ['util', 'APP_CONFIGURATION'];

function resolve(util, APP_CONFIG) {
    return function(url) {
      if (!url) return '#';
      if (util.isAbsoluteUrl(url)) return url;
      return APP_CONFIG.SERVER_DEFAULT_PICTURE_ENDPOINT+'/'+url;
    };
};
