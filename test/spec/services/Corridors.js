'use strict';

describe('Service: Corridors', function () {

  // load the service's module
  beforeEach(module('gccApp'));

  // instantiate service
  var Corridors;
  beforeEach(inject(function (_Corridors_) {
    Corridors = _Corridors_;
  }));

  it('should do something', function () {
    expect(!!Corridors).toBe(true);
  });

});
