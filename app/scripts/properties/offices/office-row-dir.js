'use strict',

angular.module('gccApp')
.directive('officeRow', function() {
	return {
		templateUrl: 'scripts/properties/offices/office-row-dir.html',
		restrict: 'A',
		scope: {
			property: '=',
			currentPath: '@'
		}
	}
});