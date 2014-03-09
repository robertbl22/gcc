'use strict';

angular.module('gccApp')
.directive('pagetitle', function ($state) {
	return {
		template: '{{pageTitle}}',
		restrict: 'A',
		controller: 'BreadcrumbCtrl',
		link: function postLink(scope, element, attrs) {

			scope.$watch('$state.$current.path', function() {
				var root = 'Georgia Ports Authority';
				var separator = ' > ';
				var home = 'Site Selection';
				var path = root + separator + home;
				for (var i = 0; i < $state.$current.path.length; i++) {
					var currentPath = $state.$current.path[i];
					if(currentPath.data.title != home) {
						path = path + separator + scope.getName(currentPath.data.title);
					}
				};
				element.text(path);
			});

		}
	};
});

