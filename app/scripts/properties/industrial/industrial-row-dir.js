'use strict',

angular.module('gccApp')
.directive('industrialRow', function() {
	return {
		templateUrl: 'scripts/properties/industrial/industrial-row-dir.html',
		restrict: 'A',
		scope: {
			property: '=',
			currentPath: '@'
		}
	}
});