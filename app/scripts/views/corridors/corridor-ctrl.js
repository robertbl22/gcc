'use strict';

angular.module('gccApp')
.controller('CorridorCtrl', function ($scope, $stateParams, LocalDataSvc) {

	$scope.corridorId = $stateParams.corridorId;

	LocalDataSvc.Corridors.get($stateParams.corridorId).success(function(data) {
		$scope.Corridor = data;
	});

});
