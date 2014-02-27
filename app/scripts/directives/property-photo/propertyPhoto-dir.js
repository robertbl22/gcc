'use strict',

angular.module('gccApp')
.directive('propertyPhoto', function() {
	return {
		templateUrl: 'scripts/directives/property-photo/propertyPhoto-dir.html',
		restrict: 'A',
		scope: {
			photoSrc: '@',
			name: '@',
			link: '@'
		}
	}
});