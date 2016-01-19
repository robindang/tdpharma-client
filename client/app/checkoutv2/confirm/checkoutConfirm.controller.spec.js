'use strict';

describe('Controller: CheckoutConfirmCtrl', function () {

  // load the controller's module
  beforeEach(module('tdpharmaClientApp'));

  var CheckoutConfirmCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckoutConfirmCtrl = $controller('CheckoutConfirmCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
