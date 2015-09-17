'use strict';

describe('Directive: pagination', function () {

  // load the directive's module and view
  beforeEach(module('tdpharmaClientApp'));
  beforeEach(module('components/pagination/pagination.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pagination></pagination>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the pagination directive');
  }));
});