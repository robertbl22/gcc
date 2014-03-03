'use strict',

angular.module('gccApp')
.directive('searchSiteSize', function() {
	return {
		templateUrl: 'scripts/views/search/site/size/size.html',
		restrict: 'A',
		scope: {
			Property: '=property'
		}
	}
});