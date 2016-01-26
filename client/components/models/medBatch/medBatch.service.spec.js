'use strict';

describe('Service: MedBatch', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var MedBatch;
  beforeEach(inject(function (_MedBatch_) {
    MedBatch = _MedBatch_;
  }));

  it('should do something', function () {
    expect(!!MedBatch).toBe(true);
  });

});
