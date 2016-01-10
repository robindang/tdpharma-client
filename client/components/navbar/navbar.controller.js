'use strict';

angular.module('tdpharmaClientApp')
  .controller('NavbarCtrl', function ($scope, $location, $translate, Auth, $localStorage) {
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

    if (!$localStorage.lang) $localStorage.lang = $translate.use();
    $scope.$storage = $localStorage;
    $scope.$watch('$storage.lang', function() {
      $translate.use($storage.lang);
    });
    // $scope.setLang = function(lang) {
    //   $translate.use(lang);
    //   $scope.lang = lang;
    // }
  });