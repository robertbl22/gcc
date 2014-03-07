'use strict',

angular.module('gccApp')
.directive('siteRow', function() {
	return {
		templateUrl: 'scripts/views/sites/site-row-dir.html',
		restrict: 'A',
		scope: {
			property: '='
		}
	}
});