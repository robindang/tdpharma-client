'use strict';

describe('Controller: Checkoutv2Ctrl', function () {

  // load the controller's module
  beforeEach(module('tdpharmaClientApp'));

  var Checkoutv2Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Checkoutv2Ctrl = $controller('Checkoutv2Ctrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
