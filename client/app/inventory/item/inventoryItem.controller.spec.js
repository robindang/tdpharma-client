'use strict';

describe('Controller: InventoryItemCtrl', function () {

  // load the controller's module
  beforeEach(module('tdpharmaClientApp'));

  var InventoryItemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InventoryItemCtrl = $controller('InventoryItemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
