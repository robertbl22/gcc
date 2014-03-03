'use strict',

angular.module('gccApp')
.directive('searchSiteProximity', function() {
	return {
		templateUrl: 'scripts/views/search/site/proximity/proximity.html',
		restrict: 'A',
		scope: {
			Proximity: '=proximity'
		}
	}
});