'use strict';

angular.module('gccApp')
.directive('tiersIndicator', function () {
	return {
		templateUrl: 'scripts/directives/tiers-indicator/tiersIndicator-dir.html',
		restrict: 'A',
		replace: true,
		scope: {
			tiers: '=',
			tier: '='
		},
		link: function(scope, element, attrs) {
			var popoverOpts = {
				container: 'body',
				placement: 'bottom',
				trigger: 'hover',
				html: true
			};
			var btns = element.find('.btn');
			btns.popover(popoverOpts);
		}
	};
});