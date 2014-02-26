'use strict';

var app = angular.module('gccApp')
.controller('OfficeDetailCtrl', function ($scope, $routeParams, OfficeSvc, LocalDataProvider_CountiesSvc, BreadcrumbSvc) {

	$scope.currentPath = '#/corridor/' + $routeParams.corridorId + '/county/' + $routeParams.countyId;

	OfficeSvc.get($routeParams.propertyId).success(function(data) {
		$scope.property = data.features[0].attributes;
		$scope.fieldAliases = data.fieldAliases;
	});

	LocalDataProvider_CountiesSvc.get($routeParams.countyId).success(function(data) {
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