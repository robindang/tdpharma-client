'use strict';

angular.module('tdpharmaClientApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', 'OrderSearch'];

function DashboardCtrl($scope, OrderSearch) {
  var ctrl = this;
  // todo(robindang): fix hardcoded number of items
  OrderSearch.getPage(
    0, // page
    10000, // max item count
    {
      sale: true,
      // todo(robindang): change min date to start of the day
      min_date: moment().subtract(1, 'day')
    })
  .then(
    function(result){
      ctrl.sales = result;
      console.log(ctrl.sales);
    });

  ctrl.chartConfig = {
    options: {
      chart: {
        type: 'spline'
      }
    },
    series: [{
      data: [10, 15, 12, 8, 7]
    }],
    title: {
      text: 'Sales'
    },

    loading: false
  };
}
