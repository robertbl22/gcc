'use strict';

describe('Service: Breadcrumb', function () {

  // load the service's module
  beforeEach(module('gccApp'));

  // instantiate service
  var Breadcrumb;
  beforeEach(inject(function (_Breadcrumb_) {
    Breadcrumb = _Breadcrumb_;
  }));

  it('should do something', function () {
    expect(!!Breadcrumb).toBe(true);
  });

});
