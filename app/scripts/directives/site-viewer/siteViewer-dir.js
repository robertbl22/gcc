'use strict',

angular.module('gccApp')
.directive('siteViewer', function() {
	return {
		templateUrl: 'scripts/directives/site-viewer/siteViewer-dir.html',
		restrict: 'A',
		scope: {
			name: '@',
			photoSrc: '@',
			lat: '@',
			lng: '@',
			geometry: '=',
			flyerLink: '@'
		},
		link: function(scope, element, attrs) {
			scope.detailsTab = 'photo';
		}
	}
});