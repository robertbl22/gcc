'use strict',

angular.module('gccApp')
.directive('searchBuildingSize', function() {
	return {
		templateUrl: 'scripts/views/search/building/size/size.html',
		restrict: 'A',
		scope: {
			Property: '=property'
		}
	}
});