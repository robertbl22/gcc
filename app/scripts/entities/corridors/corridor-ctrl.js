'use strict';

angular.module('gccApp')
.controller('CorridorCtrl', function ($scope, $routeParams, LocalDataProvider_CorridorsSvc) {

	$scope.corridorId = $routeParams.corridorId;

	LocalDataProvider_CorridorsSvc.get($routeParams.corridorId).success(function(data) {
		$scope.Corridor = data;
	});

});
