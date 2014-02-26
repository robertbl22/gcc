'use strict';

var app = angular.module('gccApp')
.controller('IndustrialListCtrl', function ($scope, $routeParams, IndustrialsSvc) {

	$scope.currentPath = '#/corridor/' + $routeParams.corridorId + '/county/' + $routeParams.countyId;

	IndustrialsSvc.get($routeParams.countyId).success(function(data) {
		$scope.Properties = data.features;
	});
	
});