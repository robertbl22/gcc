'use strict';

angular.module('gccApp')
.directive('corridorPicker', function () {
	return {
		templateUrl: 'scripts/widgets/corridor-picker/corridorPicker.html',
		restrict: 'A',
		controller: 'CorridorPickerCtrl',
		link: function(scope, element, attrs) {
		}
	};
});

