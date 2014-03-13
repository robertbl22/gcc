'use strict',

angular.module('gccApp')
.directive('corridorsIndicator', function (CountyZoomSvc) {
	return {
		templateUrl: 'scripts/directives/corridors-indicator/corridorsIndicator-dir.html',
		restrict: 'A',
		scope: {
			corridors: '=',
			active: '@'
		},
		link: function(scope, element, attrs) {
			scope.isActive = function(corridorId) {
				return corridorId === scope.active;
			};
			scope.zoomOut = function() {
				CountyZoomSvc.zoomOut();
			};
		}
	}
});