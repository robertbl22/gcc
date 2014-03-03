'use strict';

angular.module('gccApp')
.controller('CorridorPickerCtrl', function ($scope, $stateParams, DataService) {

	$scope.isActive = function(key) {
		return (key === $stateParams.corridorId);
	};

	DataService.corridor.getAll().success(function(data) {
		$scope.Corridors = data;
	});
	
});
