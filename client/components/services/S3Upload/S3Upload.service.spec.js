'use strict';

describe('Service: S3Upload', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var S3Upload;
  beforeEach(inject(function (_S3Upload_) {
    S3Upload = _S3Upload_;
  }));

  it('should do something', function () {
    expect(!!S3Upload).toBe(true);
  });

});
