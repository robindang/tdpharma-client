'use strict';

describe('Controller: CategoriesItemCtrl', function () {

  // load the controller's module
  beforeEach(module('tdpharmaClientApp'));

  var CategoriesItemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CategoriesItemCtrl = $controller('CategoriesItemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
