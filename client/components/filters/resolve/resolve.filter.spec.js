'use strict';

describe('Filter: resolve', function () {

  // load the filter's module
  beforeEach(module('tdpharmaClientApp'));

  // initialize a new instance of the filter before each test
  var resolve;
  beforeEach(inject(function ($filter) {
    resolve = $filter('resolve');
  }));

  it('should return the input prefixed with "resolve filter:"', function () {
    var text = 'angularjs';
    expect(resolve(text)).toBe('http://tdpos.herokuapp.com/angularjs');
  });

});
