'use strict';

angular.module('gccApp')
.directive('countyLink', function() {
	return {
		template: '<a ui-sref="corridor.county">{{name}} County</a>',
		scope : {
			countyId: '@',
			corridorId: '@',
			name: '@'
		},
		restrict: 'A'
	};
});