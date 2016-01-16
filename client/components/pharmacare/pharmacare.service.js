'use strict';

angular.module('tdpharmaClientApp')
  .factory('pharmacare', pharmacare);

pharmacare.$inject = ['$filter'];

function pharmacare($filter) {
  return {
    getDateFormat: function() {
      return $filter('translate')('DATE_FORMAT');
    },
    getDateTimeFormat: function() {
      return $filter('translate')('DATETIME_FORMAT');
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
    }
  }
}
