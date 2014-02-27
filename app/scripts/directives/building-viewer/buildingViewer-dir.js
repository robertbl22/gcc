'use strict',

angular.module('gccApp')
.directive('buildingViewer', function() {
	return {
		templateUrl: 'scripts/directives/building-viewer/buildingViewer-dir.html',
		restrict: 'A',
		scope: {
			name: '@',
			photoSrc: '@',
			lat: '@',
			lng: '@',
			flyerLink: '@'
		},
		link: function(scope, element, attrs) {
			scope.detailsTab = 'photo';
		}
	}
});