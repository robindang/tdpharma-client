'use strict';

describe('Service: serverConfig', function () {

  // load the service's module
  beforeEach(module('tdpharmaClientApp'));

  // instantiate service
  var serverConfig;
  beforeEach(inject(function (_serverConfig_) {
    serverConfig = _serverConfig_;
  }));

  it('should do something', function () {
    expect(!!serverConfig).toBe(true);
  });

});
