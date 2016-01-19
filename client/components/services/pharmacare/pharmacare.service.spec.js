'use strict';

describe('Service: pharmacare', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var pharmacare;
  beforeEach(inject(function (_pharmacare_) {
    pharmacare = _pharmacare_;
  }));

  it('should do something', function () {
    expect(!!pharmacare).toBe(true);
  });

});
