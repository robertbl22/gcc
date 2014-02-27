'use strict';

angular.module('gccApp')
.controller('CorridorCtrl', function ($scope, $routeParams, LocalDataSvc) {

	$scope.corridorId = $routeParams.corridorId;

	LocalDataSvc.Corridors.get($routeParams.corridorId).success(function(data) {
		$scope.Corridor = data;
	});

});
