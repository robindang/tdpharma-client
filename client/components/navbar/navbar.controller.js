'use strict';

angular.module('tdpharmaClientApp')
  .controller('NavbarCtrl', function ($scope, $location, $filter, Auth) {
    $scope.menu = [{
      'title': $filter('translate')('HOME'),
      'link': '/'
    }, {
      title: $filter('translate')('INVENTORY'),
      link: '/inventory'
    }, {
      title: $filter('translate')('ORDERS'),
      link: '/orders'
    }, {
      title: $filter('translate')('CHECKOUT'),
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