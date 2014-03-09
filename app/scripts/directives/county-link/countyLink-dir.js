'use strict';

angular.module('gccApp')
.directive('countyLink', function() {
	return {
		template: '<a ui-sref="corridor.county({corridorId: corridorId, countyId: countyId})">{{name}} County</a>',
		scope : {
			countyId: '@',
			corridorId: '@',
			name: '@'
		},
		restrict: 'A'
	};
});