'use strict';

angular.module('gccApp')
.directive('corridorPicker', function () {
	return {
		templateUrl: 'scripts/corridor-picker/corridorPicker.html',
		restrict: 'A',
		controller: 'CorridorPickerCtrl',
		link: function(scope, element, attrs) {
		}
	};
});

