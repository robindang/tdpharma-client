'use strict';

describe('Service: OrderSearch', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var OrderSearch;
  beforeEach(inject(function (_OrderSearch_) {
    OrderSearch = _OrderSearch_;
  }));

  it('should do something', function () {
    expect(!!OrderSearch).toBe(true);
  });

});
