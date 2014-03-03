'use strict',

angular.module('gccApp')
.directive('searchBuildingProximity', function() {
	return {
		templateUrl: 'scripts/views/search/building/proximity/proximity.html',
		restrict: 'A',
		scope: {
			Proximity: '=proximity'
		}
	}
});