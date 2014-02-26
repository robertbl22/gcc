'use strict';

angular.module('gccApp')
.directive('breadcrumb', function () {
	return {
		templateUrl: 'scripts/breadcrumb/breadcrumb.html',
		restrict: 'A',
		controller: 'BreadcrumbCtrl',
		link: function postLink(scope, element, attrs) {
		}
	};
});

