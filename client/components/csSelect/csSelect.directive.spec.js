'use strict';

describe('Directive: csSelect', function () {

  // load the directive's module and view
  beforeEach(module('tdpharmaClientApp'));
  beforeEach(module('app/csSelect/csSelect.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cs-select></cs-select>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the csSelect directive');
  }));
});