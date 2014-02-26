'use strict';

describe('Controller: CorridorCtrl', function () {

  // load the controller's module
  beforeEach(module('gccApp'));

  var CorridorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CorridorCtrl = $controller('CorridorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
