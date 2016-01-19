'use strict';

angular.module('tdpharmaClientApp')
  .factory('util', function () {
    // Service logic
    // ...

    var absoluteUrlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3})|'+ // OR ip (v4) address
      'localhost)'+ // OR localhost
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '([?][;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i');

    // Public API here
    return {
      isAbsoluteUrl: function (url) {
        return absoluteUrlPattern.test(url);
      }
    };
  });
