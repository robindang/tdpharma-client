'use strict';

angular.module('tdpharmaClientApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'HOME',
      'link': '/'
    }, {
      title: 'INVENTORY',
      link: '/inventory'
    }, {
      title: 'ORDERS',
      link: '/orders'
    }, {
      title: 'CHECKOUT',
      link: '/checkout'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });