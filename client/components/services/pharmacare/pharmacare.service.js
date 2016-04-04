'use strict';

angular.module('tdpharmaClientApp')
  .service('pharmacare', pharmacare);

pharmacare.$inject = ['$filter', '$localStorage', '$translate', '$window', '$locale', 'amMoment', 'toastr'];

function pharmacare($filter, $storage, $translate, $window, $locale, amMoment, toastr) {
  var moment = $window.moment;
  return {
    getDatePickerDateFormat: function(key) {
      if (!key) {key = 'L';}
      return moment.localeData().longDateFormat(key).replace('DD','dd').replace('YYYY','yyyy');
    },
    getLocale: function() {
      var locale = $storage.locale;
      if (locale) {return locale;}
      return this.updateLocale();
    },
    getLocaleFlagCSSClass: function() {
      var locale = this.getLocale();
      if (locale === 'vi') {return 'flag-icon-vn';}
      if (locale === 'en') {return 'flag-icon-gb';}
      return '';
    },
    getStatus: function(item) {
      if (!item) {return '';}
      if (item.status === 'inactive') {return 'Off Sale';}
      if (item.status === 'active') {return item.amount ? 'On Sale':'Out of Stock';}
      return item.status;
    },
    getStatusCSSClass: function(item) {
      var status = this.getStatus(item);
      if (status === 'Off Sale') {return 'text-danger';}
      if (status === 'On Sale') {return 'text-success';}
      if (status === 'Out of Stock') {return 'text-warning';}
      return '';
    },
    updateLocale: function(locale) {
      if (!locale) {locale = $storage.locale || $translate.use();}
      $storage.locale = locale;      
      amMoment.changeLocale(locale);
      $translate.use(locale);
      if (locale === 'vi') {
        $locale.id = 'vi-vn';
      } else {
        $locale.id = 'en-us';
      }
      return locale;
    },
    getCurrencySymbol: function(){
      var locale = $storage.locale || $translate.use();
      return ((locale === 'vi') ? 'đ ' : '$ ');       
    },
    barcodePrint: function(item) {
      /* jshint quotmark: true */
      var divID = "code-" + item.barcode;
      var printContents = document.getElementById(divID);
      var popupWin = window.open("", "_blank");
      popupWin.document.open();
      popupWin.document.write("<html><head></head><body onload=\"window.print()\"><img src=\"" + printContents.src + "\"/></body></html>");
      popupWin.document.close();
    },
    validateMedBatch: function(batch, name) {
      if (!batch.user_id) {
        toastr.error(name + ': ' + $filter('translate')('AUTHOR_REQUIRED')); return false;
      }
      if (!batch.category_id) {
        toastr.error(name + ': ' + $filter('translate')('CATEGORY_REQUIRED')); return false;
      }    
      if (!batch.mfg_date){
        toastr.error(name + ': ' + $filter('translate')('MFG_DATE_REQUIRED')); return false;
      }
      if (!batch.expire_date) {
        toastr.error(name + ': ' + $filter('translate')('EXPIRE_DATE_REQUIRED')); return false;
      }
      if (!batch.package){
        toastr.error(name + ': ' + $filter('translate')('PACKAGE_REQUIRED')); return false;
      }
      if (!batch.amount_per_pkg) {
        toastr.error(name + ': ' + $filter('translate')('AMOUNT_PER_PKG_REQUIRED')); return false;
      }
      if (!batch.number_pkg) {
        toastr.error(name + ': ' + $filter('translate')('NUM_PACKAGE_REQUIRED')); return false;
      }
      if (!batch.total_units) {
        toastr.error(name + ': ' + $filter('translate')('TOTAL_UNITS_REQUIRED')); return false;
      }
      if (!batch.total_price) {
        toastr.error(name + ': ' + $filter('translate')('PRICE_REQUIRED')); return false;
      }
      return true;
    } 
  };
}
