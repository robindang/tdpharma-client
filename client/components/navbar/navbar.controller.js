'use strict';

angular.module('tdpharmaClientApp')
  .controller('NavbarCtrl', function ($scope, $location, $translate, Auth, localStorageService) {
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

    $scope.lang = localStorageService.get('lang') || $translate.use();
    $scope.setLang = function(lang) {
      localStorageService.set('lang', lang);
      $translate.use(lang);
      $scope.lang = lang;
    }
  });