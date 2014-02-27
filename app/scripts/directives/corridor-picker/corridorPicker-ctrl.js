'use strict';

angular.module('gccApp')
.controller('CorridorPickerCtrl', function ($scope, $routeParams, LocalDataSvc) {

	$scope.isActive = function(key) {
		return (key === $routeParams.corridorId);
	};

	LocalDataSvc.Corridors.get().success(function(data) {
		$scope.Corridors = data;
	});
	
});
