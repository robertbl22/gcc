'use strict',

angular.module('gccApp')
.directive('searchLocation', function() {
	return {
		templateUrl: 'scripts/views/search/location/location.html',
		restrict: 'A',
		controller: 'SearchLocationCtrl',
		scope: {
			Property: '=property',
			Location: '=location'
		}
	}
});