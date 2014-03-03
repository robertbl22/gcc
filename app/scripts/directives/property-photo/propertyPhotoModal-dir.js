'use strict',

angular.module('gccApp')
.directive('propertyPhotoModal', function(PropertyPhotoSvc) {
	return {
		templateUrl: 'scripts/directives/property-photo/propertyPhotoModal-dir.html',
		restrict: 'A',
		scope: {},
		link: function(scope, element, attrs) {
			var watched = function(){ return PropertyPhotoSvc.photoSrc; };
			scope.$watch(watched, function() {
				scope.photoSrc = PropertyPhotoSvc.photoSrc;
				scope.name = PropertyPhotoSvc.name;
			});
		}
	}
});