'use strict';

angular.module('tdpharmaClientApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [];

function MainCtrl() {
    
    var ctrl = this;
    ctrl.text = {
      company: 'Pharmaplus'
    };

    ctrl.features = [
      {
        info: 'Track your store inventory. Put items on and off sale.',
        link: '/inventory',
        name: 'Track your inventory...'
      }, {
        info: 'Manage your store. Add users. Track their actions.',
        link: '#',
        name: 'Manage your store...'
      }, {
        info: 'Track your sales and purchases history. See your daily and monthly revenue and expenses.',
        link: '/orders',
        name: 'Track your sales and purchases...'
      }, {
        info: 'Simple and easy to use interface to speed up checkout process',
        link: '/checkout',
        name: 'Effective Point of Sale...'
      }, {
        info: 'Changes in prices become effective immediately independent of time and location',
        link: '/inventory',
        name: 'Real time Price Control...'
      }, {
        info: '',
        link: '',
        name: '...'
      }];

}
