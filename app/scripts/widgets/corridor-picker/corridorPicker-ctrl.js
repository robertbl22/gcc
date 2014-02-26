'use strict';

angular.module('gccApp')
.controller('CorridorPickerCtrl', function ($scope, $routeParams, LocalDataProvider_CorridorsSvc) {

	$scope.isActive = function(key) {
		return (key === $routeParams.corridorId);
	};

	LocalDataProvider_CorridorsSvc.get().success(function(data) {
		$scope.Corridors = data;
	});
	
});
