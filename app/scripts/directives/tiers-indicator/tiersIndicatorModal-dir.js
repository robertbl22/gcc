'use strict',

angular.module('gccApp')
.directive('tiersIndicatorModal', function() {
	return {
		templateUrl: 'scripts/directives/tiers-indicator/tiersIndicatorModal-dir.html',
		restrict: 'A',
		scope: {},
		link: function(scope, element, attrs) {
		}
	}
});