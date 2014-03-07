'use strict';

angular.module('gccApp')
.directive('navbar', function() {
	return {
		templateUrl: 'scripts/directives/navbar/navbar.html',
		restrict: 'A',
		link: function(scope, element, attrs) {

			element.find('.navbar-search input, .navbar-search .btn').click(function(e) {
				e.stopPropagation();
			});
		}
	};
});

