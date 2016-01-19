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
    var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
      '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
      '([?][;&a-z\d%_.~+=-]*)?'+ // query string
      '(\#[-a-z\d_]*)?$','i'); // fragment locater
    expect(resolve(text)).toMatch(pattern);
  });

});
