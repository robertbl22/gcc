'use strict';

angular.module('gccApp')
.controller('CorridorCtrl', function ($scope, $routeParams, CorridorsSvc) {

	$scope.corridorId = $routeParams.corridorId;

	CorridorsSvc.get($routeParams.corridorId).success(function(data) {
		$scope.Corridor = data;
	});

});
