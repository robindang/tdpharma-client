'use strict';

describe('Directive: hashchangeEvent', function () {

  // load the directive's module
  beforeEach(module('tdpharmaClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hashchange-event></hashchange-event>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});