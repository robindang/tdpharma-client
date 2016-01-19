'use strict';

describe('Service: InventorySearch', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var InventorySearch;
  beforeEach(inject(function (_InventorySearch_) {
    InventorySearch = _InventorySearch_;
  }));

  it('should do something', function () {
    expect(!!InventorySearch).toBe(true);
  });

});
