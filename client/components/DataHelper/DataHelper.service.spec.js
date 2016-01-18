'use strict';

describe('Service: DataHelper', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var dataHelper;
  beforeEach(inject(function (_DataHelper_) {
    DataHelper = _DataHelper_;
  }));

  it('should do something', function () {
    expect(!!DataHelper).toBe(true);
  });

});
