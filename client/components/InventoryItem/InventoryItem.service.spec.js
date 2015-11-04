'use strict';

describe('Service: InventoryItem', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var InventoryItem;
  beforeEach(inject(function (_InventoryItem_) {
    InventoryItem = _InventoryItem_;
  }));

  it('should do something', function () {
    expect(!!InventoryItem).toBe(true);
  });

});
