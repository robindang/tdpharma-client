'use strict';

angular.module('tdpharmaClientApp')
  .controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['$scope', 'Transaction', 'toastr'];

function DashboardCtrl($scope, Transaction, toastr) {
  var ctrl = this;

  ctrl.display = {
    sales: [],
    purchases: [],
    graphs: [],    
    top_transactions: []
  };


  intialize();
  
  function intialize() {
    var atm = moment();
    var bd = moment().startOf('day');

    Transaction.query({created_max: atm, created_min: bd}, function(res) {
      ctrl.display.sales = _.filter(res, function(t) {return t.transaction_type == 'sale';});      
      ctrl.display.purchases = _.filter(res, function(t) {return t.transaction_type == 'purchase';});
      ctrl.display.graphs.push(groupByHour(ctrl.display.sales, 'Sale', 'Today Sale'));
      ctrl.display.graphs.push(groupByHour(ctrl.display.purchases, 'Purchase', 'Today Purchase'));
      ctrl.display.top_transactions.push({
        data: _.chain(ctrl.display.sales).sortBy(function(t){return t.total_price;}).reverse().slice(0,10).value(),
        label: 'Sale'
      });
      ctrl.display.top_transactions.push({
        data: _.chain(ctrl.display.sales).sortBy(function(t){return t.amount;}).reverse().slice(0,10).value(),
        label: 'Sale Amount'
      });
      ctrl.display.top_transactions.push({
        data: _.chain(ctrl.display.purchases).sortBy(function(t){return t.total_price;}).reverse().slice(0,10).value(),
        label: 'Purchase'
      });
      ctrl.display.top_transactions.push({
        data: _.chain(ctrl.display.purchases).sortBy(function(t){return t.amount;}).reverse().slice(0,10).value(),
        label: 'Purchase Amount'
      }) ;     
    }, function(error) {
      toastr.error(error.data.errors);
    });
  }

  function groupByHour(data, label, title) {
    var result = {
      title: title,
      labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00','21:00', '23:59'],
      series: [label],
      data: [[0]]
    };
    var start = moment().startOf('day');
    var end = moment().startOf('day');
    for(var i = 0; i < result.labels.length-1; i++) {      
      start = angular.copy(end);
      end = angular.copy(start).add(3, 'hour');
      var sum = 0;
      // Pick the last second of the date as cut off
      if (end.isSame(moment().startOf('day').add(1,'day'))) {
        end = end.subtract(1, 'second');
      }
      var transactions = _.filter(data, function(t) {
        return moment(t.created_at).isAfter(start) && (moment(t.created_at).isBefore(end) || moment(t.created_at).isSame(end));
      });
      _.forEach(transactions, function(t){ sum += t.total_price;});      
      if (sum > 0) {
        result.data[0].push(sum);
      }      
    }
    return result;
  }
}
