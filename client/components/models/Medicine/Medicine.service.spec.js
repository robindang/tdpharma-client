'use strict';

describe('Service: Medicine', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var Medicine;
  beforeEach(inject(function (_Medicine_) {
    Medicine = _Medicine_;
  }));

  it('should do something', function () {
    expect(!!Medicine).toBe(true);
  });

});
