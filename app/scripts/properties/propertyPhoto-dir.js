'use strict',

angular.module('gccApp')
.directive('propertyPhoto', function() {
	return {
		templateUrl: 'scripts/properties/propertyPhoto-dir.html',
		restrict: 'A',
		scope: {
			photosrc: '@',
			title: '@',
			link: '@'
		}
	}
});