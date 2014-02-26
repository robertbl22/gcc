'use strict';

angular.module('gccApp')
.controller('CorridorPickerCtrl', function ($scope, $routeParams, CorridorsSvc) {

	$scope.isActive = function(key) {
		return (key === $routeParams.corridorId);
	};

	CorridorsSvc.get().success(function(data) {
		$scope.Corridors = data;
	});
	
});
