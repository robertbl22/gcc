'use strict';

angular.module('gccApp')
.directive('tiersIndicator', function () {
	return {
		templateUrl: 'scripts/directives/tiersIndicator-dir.html',
		restrict: 'A',
		replace: true,
		scope: {
			tiers: '=',
			tier: '='
		},
		link: function(scope, element, attrs) {
			element.find('.btn').popover();
		}
	};
});