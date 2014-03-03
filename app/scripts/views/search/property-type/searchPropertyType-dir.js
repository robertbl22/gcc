'use strict',

angular.module('gccApp')
.directive('searchPropertyType', function() {
	return {
		templateUrl: 'scripts/views/search/property-type/property-type.html',
		restrict: 'A',
		scope: {
			Property: '=property'
		}
	}
});