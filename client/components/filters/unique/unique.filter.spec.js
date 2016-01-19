'use strict';

describe('Filter: unique', function () {

  // load the filter's module
  beforeEach(module('tdpharmaClientApp'));

  // initialize a new instance of the filter before each test
  var unique;
  beforeEach(inject(function ($filter) {
    unique = $filter('unique');
  }));

  it('should return the input prefixed with "unique filter:"', function () {
    var a = [{id:"foo"}, {id:"bar"}, {id:"baz"}];
    expect(unique(a,'id')).toContain(a[0]);
  });

});
