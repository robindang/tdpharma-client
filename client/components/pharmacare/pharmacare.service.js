'use strict';

angular.module('tdpharmaClientApp')
  .service('pharmacare', pharmacare);

pharmacare.$inject = ['$filter', '$localStorage', '$translate', '$window', 'amMoment'];

function pharmacare($filter, $storage, $translate, $window, amMoment) {
  var moment = $window.moment;
  return {
    getDatePickerDateFormat: function(key) {
      if (!key) key = 'L';
      return moment.localeData().longDateFormat(key).replace('DD','dd').replace('YYYY','yyyy');
    },
    getLocale: function() {
      var locale = $storage.locale;
      if (locale) return locale;
      return this.updateLocale();
    },
    getLocaleFlagCSSClass: function() {
      var locale = this.getLocale();
      if (locale === 'vi') return 'flag-icon-vn';
      if (locale === 'en-ca') return 'flag-icon-gb';
      return '';
    },
    getStatus: function(item) {
      if (!item) return '';
      if (item.status === 'inactive') return 'Off Sale';
      if (item.status === 'active') return item.amount ? 'On Sale':'Out of Stock';
      return item.status;
    },
    getStatusCSSClass: function(item) {
      var status = this.getStatus(item);
      if (status === 'Off Sale') return 'text-danger';
      if (status === 'On Sale') return 'text-success';
      if (status === 'Out of Stock') return 'text-warning';
      return ''
    },
    updateLocale: function(locale) {
      if (!locale) locale = $storage.locale || $translate.use();
      $storage.locale = locale;
      console.log('locale changed to ' + $storage.locale);
      amMoment.changeLocale(locale);
      $translate.use(locale);
      return locale;
    }
  }
}
