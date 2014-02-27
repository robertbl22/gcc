'use strict';

angular.module('gccApp')
.directive('countyLink', function() {
	return {
		template: '<a ng-href="{{currentPath}}">{{name}} County</a>',
		scope : {
			countyId: '@',
			corridorId: '@',
			name: '@'
		},
		restrict: 'A',
		link: function (scope, element, attrs) {
			
			var hasPath = false;
			scope.currentPath = '#';
			if(scope.corridorId) {
				scope.currentPath += '/corridor/' + scope.corridorId;
				hasPath = true;
			}
			if(scope.countyId) {
				scope.currentPath += '/county/' + scope.countyId;
				hasPath = true;
			}
			if(!hasPath) {
				scope.$watch('name', function() {
					if(scope.name) {
						element.replaceWith(scope.name);
					}
				});
			}
			
		}
	};
});