'use strict';

describe('Service: Receipt', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var Receipt;
  beforeEach(inject(function (_Receipt_) {
    Receipt = _Receipt_;
  }));

  it('should do something', function () {
    expect(!!Receipt).toBe(true);
  });

});
