'use strict';

describe('Controller: InventoryItemCtrl', function () {

  // load the controller's module
  beforeEach(module('tdpharmaClientApp'));

  var InventoryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InventoryCtrl = $controller('InventoryItemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
