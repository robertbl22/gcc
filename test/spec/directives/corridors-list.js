'use strict';

describe('Directive: corridorsList', function () {

  // load the directive's module
  beforeEach(module('gccApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<corridors-list></corridors-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the corridorsList directive');
  }));
});
