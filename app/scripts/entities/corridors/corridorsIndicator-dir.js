'use strict',

angular.module('gccApp')
.directive('corridorsIndicator', function() {
	return {
		templateUrl: 'scripts/entities/corridors/corridorsIndicator-dir.html',
		restrict: 'A',
		scope: {
			corridors: '=',
			active: '@'
		},
		link: function(scope, element, attrs) {
			scope.isActive = function(corridorId) {
				return corridorId === scope.active;
			};
		}
	}
});