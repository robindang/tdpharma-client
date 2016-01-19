'use strict';

describe('Directive: goClick', function () {

  // load the directive's module
  beforeEach(module('tdpharmaClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should change URL location to #', inject(function ($compile) {
    element = angular.element('<button go-click="#"></button>');
    element = $compile(element)(scope);
    element.triggerHandler('click')
    // TODO: check result
  }));
});