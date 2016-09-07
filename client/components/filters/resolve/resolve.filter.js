'use strict';

angular.module('tdpharmaClientApp')
  .filter('resolve', resolve);

resolve.$inject = ['util', 'APP_CONFIGURATION'];

function resolve(util, APP_CONFIG) {
    return function(url) {
      if (!url) {return '#';}
      // With paperclip 5 and aws sdk 2, image url is also return as relative path
      if (url.indexOf('s3.amazonaws') >= 0) {return url;}            
      return APP_CONFIG.SERVER_DEFAULT_PICTURE_ENDPOINT+'/'+url;
    };
};
