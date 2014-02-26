'use strict';

describe('Controller: CountyCtrl', function () {

  // load the controller's module
  beforeEach(module('gccApp'));

  var CountyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CountyCtrl = $controller('CountyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
