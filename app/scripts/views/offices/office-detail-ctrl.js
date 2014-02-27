'use strict';

var app = angular.module('gccApp')
.controller('OfficeDetailCtrl', function ($scope, $stateParams, LocalDataSvc, OfficesSvc, BreadcrumbSvc, ToastrSvc) {

	$scope.corridorId = $stateParams.corridorId;
	$scope.countyId = $stateParams.countyId;
	var propertyId = $stateParams.propertyId;
	//$scope.detailsTab = 'map';

	/* Local data for "corridors-indicator" */
	LocalDataSvc.Counties.get($stateParams.countyId).success(function(data) {
		$scope.county = data;
		$scope.county.corridorId = $stateParams.corridorId;
	});

	/* SelectGeorgia data */
	OfficesSvc.get(propertyId)
	.then(function(data){
		$scope.property = data.features[0].attributes;
		$scope.fieldAliases = data.fieldAliases;
	}).catch(function(e){
		ToastrSvc.error('Sorry, there was an error while loading the data.');
	});

	/* "Return" link */
	$scope.previousPath = BreadcrumbSvc.previousPath;
	$scope.hasPreviousPath = function() {
		if(BreadcrumbSvc.previousPath === BreadcrumbSvc.currentPath) {
			return false;
		}
		return true;
	};


	///////////////////////////////////////////////

	/*OfficeSvc.get($stateParams.propertyId).success(function(data) {
		$scope.property = data.features[0].attributes;
		$scope.fieldAliases = data.fieldAliases;
	});

	LocalDataSvc.Counties.get($stateParams.countyId).success(function(data) {
		$scope.county = data;
		$scope.county.corridorId = $stateParams.corridorId;
	});

	$scope.previousPath = BreadcrumbSvc.previousPath;
	$scope.hasPreviousPath = function() {
		if(BreadcrumbSvc.previousPath === BreadcrumbSvc.currentPath) {
			return false;
		}
		return true;
	};*/
	
});