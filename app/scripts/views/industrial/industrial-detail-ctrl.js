'use strict';

var app = angular.module('gccApp')
.controller('IndustrialDetailCtrl', function ($scope, $routeParams, IndustrialSvc, LocalDataSvc, BreadcrumbSvc) {

	$scope.corridorId = $routeParams.corridorId;
	$scope.countyId = $routeParams.countyId;

	IndustrialSvc.get($routeParams.propertyId).success(function(data) {
		$scope.property = data.features[0].attributes;
		$scope.fieldAliases = data.fieldAliases;
	});

	LocalDataSvc.Counties.get($routeParams.countyId).success(function(data) {
		$scope.county = data;
		$scope.county.corridorId = $routeParams.corridorId;
	});

	$scope.previousPath = BreadcrumbSvc.previousPath;
	$scope.hasPreviousPath = function() {
		if(BreadcrumbSvc.previousPath === BreadcrumbSvc.currentPath) {
			return false;
		}
		return true;
	};
	
});