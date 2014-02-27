'use strict';

angular.module('gccApp')
.controller('CorridorPickerCtrl', function ($scope, $stateParams, LocalDataSvc) {

	$scope.isActive = function(key) {
		return (key === $stateParams.corridorId);
	};

	LocalDataSvc.Corridors.get().success(function(data) {
		$scope.Corridors = data;
	});
	
});
