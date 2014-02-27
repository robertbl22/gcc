'use strict';

angular.module('gccApp')
.directive('corridorPicker', function () {
	return {
		templateUrl: 'scripts/directives/corridor-picker/corridorPicker.html',
		restrict: 'A',
		controller: 'CorridorPickerCtrl',
		link: function(scope, element, attrs) {
		}
	};
});

