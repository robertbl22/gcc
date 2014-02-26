'use strict',

angular.module('gccApp')
.directive('propertyPhoto', function() {
	return {
		templateUrl: 'scripts/entities/properties/propertyPhoto-dir.html',
		restrict: 'A',
		scope: {
			photosrc: '@',
			title: '@',
			link: '@'
		}
	}
});