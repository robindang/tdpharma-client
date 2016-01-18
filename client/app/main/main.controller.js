'use strict';

angular.module('tdpharmaClientApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl() {
    
    var ctrl = this;
    ctrl.text = {
      company: 'Pharmaplus'
    }

    ctrl.features = [
      {
        info: 'Track your store inventory. Update prices. Put items on and off sale.',
        link: '/inventory',
        name: 'Track your inventory...'
      }, {
        info: 'Manage your store. Add users. Track their actions.',
        link: '#',
        name: 'Manage your store...'
      }, {
        info: 'Track your sales and purchase history. See your daily and monthly sales and expenses.',
        link: '/orders',
        name: 'Track your sales and purchases...'
      }, {
        info: 'Checkout customer orders. Record transactions.',
        link: '/checkout',
        name: 'Record retail transactions...'
      }];

};
