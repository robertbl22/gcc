'use strict',

angular.module('gccApp')
.directive('industrialRow', function() {
	return {
		templateUrl: 'scripts/entities/properties/industrial/industrial-row-dir.html',
		restrict: 'A',
		scope: {
			property: '=',
			currentPath: '@'
		}
	}
});