'use strict',

angular.module('gccApp')
.directive('propertyPhoto', function(PropertyPhotoSvc) {
	return {
		templateUrl: 'scripts/directives/property-photo/propertyPhoto-dir.html',
		restrict: 'A',
		scope: {
			photoSrc: '@',
			name: '@'
		},
		link: function(scope, element, attrs) {
			scope.$watch('photoSrc', function() {
				PropertyPhotoSvc.photoSrc = scope.photoSrc;
				PropertyPhotoSvc.name = scope.name;
			});
		}
	}
});